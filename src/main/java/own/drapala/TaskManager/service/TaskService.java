package own.drapala.TaskManager.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    Task createTask(TaskDTO taskDTO);

    Optional<TaskDTO> updateTask(Long id, TaskDTO taskDTO);

    void deleteTask(Long id);

    Optional<List<TaskDTO>> findAll();

    Page<TaskDTO> findAll(Pageable pageable);

    Page<TaskDTO> findByOwnerOrderByDateDesc(User user, Pageable pageable);

    Optional<TaskDTO> setTaskCompleted(Long id, Long completedBy);

    Page<TaskDTO> findFreeTasks(Pageable pageable);

    Optional<TaskDTO> getTaskById(Long taskId);

    void assignTaskToUser(Task task, User user);

    void unassignTask(Task task);

    Optional<List<Task>> getTasksForCardId(Long l);

    Optional<TaskDTO> updateTasksCard(Card cardId, Long taskId);

    Optional<Integer> getTaskCountForCardId(Long id);
}