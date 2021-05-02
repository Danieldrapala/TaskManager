package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {
}
