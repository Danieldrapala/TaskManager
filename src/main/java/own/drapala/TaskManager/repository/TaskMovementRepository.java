package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.TaskMovement;

@Repository
public interface TaskMovementRepository extends JpaRepository<TaskMovement,Long> {

    @Query(
            "SELECT " +
                    "    count(*) " +
                    "FROM " +
                    "    TaskMovement tm " +
                    "WHERE " +
                    "   dayofweek(tm.timestamp) = :day " +
                    "   AND MONTH(tm.timestamp) = :month " +
                    "   AND YEAR(tm.timestamp) = :year " +
                    "   AND tm.task = :task_id " +
                    "order by tm.task "
    )
    Long getDragNDropFlow(Long task_id, Integer day , Integer year, Integer month );
}
