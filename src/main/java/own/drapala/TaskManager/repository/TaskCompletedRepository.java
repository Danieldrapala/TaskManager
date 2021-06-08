package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.TaskCompleted;

import java.time.LocalDateTime;


@Repository
public interface TaskCompletedRepository extends JpaRepository<TaskCompleted,Long> {


    @Query(
            "SELECT " +
                    "    count(*) " +
                    "FROM " +
                    "    TaskCompleted tc " +
                    "WHERE " +
                    "   MONTH(tc.status) = :month " +
                    "   AND YEAR(tc.status) = :year " +
                    "   AND tc.completedBy = :id " +
                    "order by tc.completedBy, tc.task "
    )
    Long getCompletedTask(Long id, Integer month, Integer year);
}