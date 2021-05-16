package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.TaskMovement;
import own.drapala.TaskManager.repository.TaskMovementRepository;

import java.sql.Timestamp;
import java.time.Instant;

@Service
public class TaskMovementService {

    @Autowired
    private final TaskMovementRepository taskMovementRepository;

    public TaskMovementService(TaskMovementRepository taskMovementRepository) {
        this.taskMovementRepository = taskMovementRepository;
    }

    public void saveTaskMovement(Long previousCardId, Long currentCardId, Long TaskId){
        TaskMovement moveTaskHistory = new TaskMovement();
        moveTaskHistory.setTask(TaskId);
        moveTaskHistory.setPreviousCard(previousCardId);
        moveTaskHistory.setCurrentCard(currentCardId);
        moveTaskHistory.setTimestamp(Timestamp.from(Instant.now()));
        taskMovementRepository.save(moveTaskHistory);
    }


}
