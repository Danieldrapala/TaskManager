package own.drapala.TaskManager.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.TaskCompleted;
import own.drapala.TaskManager.repository.TaskCompletedRepository;

import java.sql.Timestamp;
import java.time.Instant;

@Service
public class TaskCompletedService {

    @Autowired
    private final TaskCompletedRepository taskCompletedRepository;

    public TaskCompletedService(TaskCompletedRepository taskCompletedRepository) {
        this.taskCompletedRepository = taskCompletedRepository;
    }

    public void rememberCompletedTask(Long taskId, Long completedBy){
        TaskCompleted completed = new TaskCompleted();
        completed.setTask(taskId);
        completed.setStatus(Timestamp.from(Instant.now()));
        completed.setCompletedBy(completedBy);
        taskCompletedRepository.save(completed);
    }
}
