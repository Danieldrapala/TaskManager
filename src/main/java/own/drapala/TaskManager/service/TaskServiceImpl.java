package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.TaskCompleted;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.repository.CommentRepository;
import own.drapala.TaskManager.repository.TaskRepository;
import own.drapala.TaskManager.repository.UserRepository;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final TaskAssignmentService taskAssignmentService;
    private TaskCompletedService taskCompletedService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TaskCompletedService taskCompletedService,  UserRepository userRepository, CardRepository cardRepository, CommentRepository commentRepository, TaskAssignmentService taskAssignmentService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
        this.commentRepository = commentRepository;
        this.taskAssignmentService = taskAssignmentService;
        this.taskCompletedService = taskCompletedService;
    }

    @Override
    public Task createTask(TaskDTO taskDTO) {
        Task newTask = new Task();
        newTask.setName(taskDTO.getName());
        newTask.setDescription(taskDTO.getDescription());
        newTask.setDate(taskDTO.getDate());
        newTask.setCompleted(false);
        newTask.setOwner(userRepository.getOne(taskDTO.getOwner().getId()));
        newTask.setCard(cardRepository.getOne(taskDTO.getCard().getId()));
        if(taskDTO.getAssignedTo()!=null) {
            newTask.setAssignedTo(userRepository.getOne(taskDTO.getAssignedTo().getId()));
        }

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
                    task.setDate(updatedTaskDTO.getDate());
                    if(updatedTaskDTO.getAssignedTo()!=null) {
                        task.setAssignedTo(userRepository.getOne(updatedTaskDTO.getAssignedTo().getId()));
                        this.taskAssignmentService.rememberAssingmentChange(updatedTaskDTO.getId(), updatedTaskDTO.getAssignedTo().getId());
                    }
                    else{
                        this.taskAssignmentService.rememberAssingmentChange(updatedTaskDTO.getId(), 0L);

                    }
                    task.setOwner(userRepository.getOne(updatedTaskDTO.getOwner().getId()));
                    task.setCard(cardRepository.getOne(updatedTaskDTO.getCard().getId()));

                    return task;
                })
                .map(TaskDTO::new);
    }

    @Override
    public void deleteTask(Long id) {

        commentRepository.deleteByTaskId(id);
        taskRepository.deleteById(id);
    }

    @Override
    public Optional<List<TaskDTO>> findAll()
    {
        return Optional.of(taskRepository.findAll().stream().map(TaskDTO::new).collect(Collectors.toList()));

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
    public Optional<TaskDTO> setTaskCompleted(Long id, Long completedBy) {

        return Optional
                .of(taskRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(task -> {
                    task.setCompleted(true);
                    this.taskCompletedService.rememberCompletedTask(task.getId(), completedBy);
                    return task;
                        }
                        ).map(TaskDTO::new);
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
        task.setAssignedTo(user);
        taskRepository.save(task);
    }

    @Override
    public void unassignTask(Task task) {
        task.setAssignedTo(null);
        taskRepository.save(task);
    }

    @Override
    public Optional<List<Task>> getTasksForCardId(Long id) {
        return taskRepository.findByColumnId(id);
    }

    @Override
    public Optional<TaskDTO> updateTasksCard(Card card, Long taskId){
        Task task = taskRepository.getOne(taskId);
        task.setCard(card);
        return  Optional.of(taskRepository.save(task)).map(TaskDTO::new);
    }

    @Override
    public Optional<Integer> getTaskCountForCardId(Long id){
        return taskRepository.findCount(id);
    }


}