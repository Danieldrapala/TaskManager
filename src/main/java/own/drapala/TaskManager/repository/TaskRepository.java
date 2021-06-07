package own.drapala.TaskManager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByOwnerOrderByDateDesc(User user, Pageable pageable);

    @Query("SELECT t FROM Task t  " +
            "join Card c on t.card = c.id\n" +
            "WHERE c.id = :id")
    Optional<List<Task>> findByColumnId(Long id);


    @Query("SELECT count(*) FROM Task t \n" +
            "WHERE t.card.id = :id \n" +
            "ORDER BY t.card.id ")
    Optional<Integer> findCount(Long id);
}