package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.TaskAssignment;

import java.time.LocalDateTime;

@Repository
public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment,Long> {

    @Query(
            "SELECT " +
                    "    count(*) " +
                    "FROM " +
                    "    TaskAssignment ta " +
                    "WHERE " +
                    "MONTH(ta.status) = :month AND YEAR(ta.status) = :year " +
                    "AND ta.user = :id " +
                    "order by ta.user, ta.task "
    )
    Long getAssignedToCount(Long id, Integer month, Integer year );
}