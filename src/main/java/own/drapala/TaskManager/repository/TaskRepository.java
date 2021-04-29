package own.drapala.TaskManager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByOwnerOrderByDateDesc(User user, Pageable pageable);
}