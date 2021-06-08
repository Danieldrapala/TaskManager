package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.TaskAssignment;
import own.drapala.TaskManager.domain.TaskCompleted;
import own.drapala.TaskManager.domain.TaskMovement;
import own.drapala.TaskManager.repository.TaskAssignmentRepository;
import own.drapala.TaskManager.repository.TaskCompletedRepository;

import java.sql.Timestamp;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.TaskAssignment;
import own.drapala.TaskManager.domain.TaskMovement;
import own.drapala.TaskManager.repository.TaskAssignmentRepository;

import java.sql.Timestamp;
import java.time.Instant;

@Service
public  class TaskAssignmentService {

    @Autowired
    private final TaskAssignmentRepository taskAssignmentRepository;

    public TaskAssignmentService(TaskAssignmentRepository taskAssignmentRepository) {
        this.taskAssignmentRepository = taskAssignmentRepository;
    }

    public void rememberAssingmentChange(Long taskId, Long assignedTo){
        TaskAssignment assignment = new TaskAssignment();
        assignment.setTask(taskId);
        assignment.setStatus(Timestamp.from(Instant.now()));
        assignment.setUser(assignedTo);
        taskAssignmentRepository.save(assignment);
    }
}
