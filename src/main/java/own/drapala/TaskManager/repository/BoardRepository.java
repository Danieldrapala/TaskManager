package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import own.drapala.TaskManager.domain.Board;

public interface BoardRepository extends JpaRepository<Board,Long> {
}
