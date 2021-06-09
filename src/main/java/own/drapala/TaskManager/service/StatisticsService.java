package own.drapala.TaskManager.service;

import java.util.List;
import java.util.Optional;

public interface StatisticsService {

    Optional<List<Long>> getAssignedToCountOnUser(Long id);

    Optional<List<Long>> getCompletedTasksCountOnUser(Long id);

    Optional<List<Long>> getTasksCount();

    Optional<List<Long>>  getAssignmentForTask(Long id);

    Optional<List<Long>>  getDragAndDropEvents(Long id);
}
