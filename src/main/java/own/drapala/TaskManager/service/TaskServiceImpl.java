package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.repository.TaskRepository;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(TaskDTO taskDTO) {
        Task newTask = new Task();
        newTask.setName(taskDTO.getName());
        newTask.setDescription(taskDTO.getDescription());
        newTask.setDate(taskDTO.getDate());
        newTask.setCompleted(false);
        newTask.setOwner(taskDTO.getOwner());
        newTask.setCreatorName(taskDTO.getCreatorName());
        taskRepository.save(newTask);
        return newTask;
    }

    @Override
    public Optional<TaskDTO> updateTask(Long id, TaskDTO updatedTaskDTO) {

        return Optional
                .of(taskRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(task -> {
                    task.setDescription(updatedTaskDTO.getDescription());
                    task.setName(updatedTaskDTO.getName());
                    task.setCompleted(updatedTaskDTO.isCompleted());
                    task.setDate(updatedTaskDTO.getDate());
                    task.setOwner(updatedTaskDTO.getOwner());
                    task.setCreatorName(updatedTaskDTO.getCreatorName());
                    return task;
                }
                )
                .map(TaskDTO::new);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Page<TaskDTO> findAll(Pageable pageable) {
        return taskRepository.findAll(pageable).map(TaskDTO::new);
    }

    @Override
    public Page<TaskDTO> findByOwnerOrderByDateDesc(User user, Pageable pageable) {
        return taskRepository.findByOwnerOrderByDateDesc(user, pageable).map(TaskDTO::new);
    }

    @Override
    public void setTaskCompleted(Long id) {
        Task task = taskRepository.getOne(id);
        task.setCompleted(true);
        taskRepository.save(task);
    }

    @Override
    public void setTaskNotCompleted(Long id) {
        Task task = taskRepository.getOne(id);
        task.setCompleted(false);
        taskRepository.save(task);
    }

    @Override
    public Page<TaskDTO> findFreeTasks(Pageable pageable) {
        return taskRepository.findByOwnerOrderByDateDesc(null, pageable).map(TaskDTO::new);

    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public void assignTaskToUser(Task task, User user) {
        task.setOwner(user);
        taskRepository.save(task);
    }

    @Override
    public void unassignTask(Task task) {
        task.setOwner(null);
        taskRepository.save(task);
    }

}