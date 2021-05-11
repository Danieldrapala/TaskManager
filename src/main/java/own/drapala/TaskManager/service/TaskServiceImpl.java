package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.repository.TaskRepository;
import own.drapala.TaskManager.repository.UserRepository;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private CardRepository cardRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, CardRepository cardRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;

    }

    @Override
    public Task createTask(TaskDTO taskDTO) {
        Task newTask = new Task();
        newTask.setName(taskDTO.getName());
        newTask.setDescription(taskDTO.getDescription());
        newTask.setDate(taskDTO.getDate());
        newTask.setCompleted(false);
        newTask.setOwner(userRepository.getOne(taskDTO.getOwner()));
        newTask.setCard(cardRepository.getOne(taskDTO.getCard()));
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
                    task.setOwner(userRepository.getOne(updatedTaskDTO.getOwner()));
                    task.setCard(cardRepository.getOne(updatedTaskDTO.getCard()));
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
    public Optional<TaskDTO> getTaskById(Long id) {
        return taskRepository.findById(id).map(TaskDTO::new);
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

    @Override
    public Optional<List<Task>> getTasksForCardId(Long id) {
        return taskRepository.findByColumnId(id);
    }

    @Override
    public Optional<TaskDTO> updateTasksCard(Card card, Long taskId) {
        Task task = taskRepository.getOne(taskId);
        task.setCard(card);
        return  Optional.of(taskRepository.save(task)).map(TaskDTO::new);

    }

}