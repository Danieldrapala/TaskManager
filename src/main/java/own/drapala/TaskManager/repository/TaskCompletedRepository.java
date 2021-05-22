package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.TaskCompleted;


@Repository
public interface TaskCompletedRepository extends JpaRepository<TaskCompleted,Long> {
}