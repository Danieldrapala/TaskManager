package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.repository.TaskAssignmentRepository;

@Service
public class TaskAssignmentService {

    @Autowired
    private final TaskAssignmentRepository taskAssignmentRepository;

    public TaskAssignmentService(TaskAssignmentRepository taskAssignmentRepository) {
        this.taskAssignmentRepository = taskAssignmentRepository;
    }

    private void rememberAssingmentChange(Long taskId, Long assignedTo){

    }
}
