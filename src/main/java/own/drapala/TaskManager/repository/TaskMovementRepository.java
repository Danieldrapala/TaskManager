package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.TaskMovement;

@Repository
public interface TaskMovementRepository extends JpaRepository<TaskMovement,Long> {
}
