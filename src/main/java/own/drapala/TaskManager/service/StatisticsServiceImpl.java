package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.repository.TaskAssignmentRepository;
import own.drapala.TaskManager.repository.TaskCompletedRepository;
import own.drapala.TaskManager.repository.TaskMovementRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StatisticsServiceImpl implements StatisticsService{

    TaskAssignmentRepository taskAssignmentRepository;
    TaskCompletedRepository taskCompletedRepository;
    TaskMovementRepository taskMovementRepository;

    @Autowired
    public StatisticsServiceImpl(TaskAssignmentRepository taskAssignmentRepository,
            TaskCompletedRepository taskCompletedRepository,
            TaskMovementRepository taskMovementRepository)
    {
        this.taskAssignmentRepository = taskAssignmentRepository;
        this.taskCompletedRepository = taskCompletedRepository;
        this.taskMovementRepository = taskMovementRepository;
    }

    @Override
    public Optional<List<Long>> getAssignedToCountOnUser(Long id) {
        LocalDateTime actualTime = LocalDateTime.now();

        List<Long> actualCount = new ArrayList<>();
        for(int i=5; i>=0; i--)
        actualCount.add(taskAssignmentRepository.getAssignedToCount(id,actualTime.minusMonths(i).getMonthValue(), actualTime.getYear()));
        return Optional.of(actualCount);
    }

    @Override
    public Optional<List<Long>> getCompletedTasksCountOnUser(Long id) {
        LocalDateTime actualTime = LocalDateTime.now();

        List<Long> actualCount = new ArrayList<>();
        for(int i=5; i>=0; i--)
            actualCount.add(taskCompletedRepository.getCompletedTask(id,actualTime.minusMonths(i).getMonthValue(), actualTime.getYear()));
        return Optional.of(actualCount);
    }
}
