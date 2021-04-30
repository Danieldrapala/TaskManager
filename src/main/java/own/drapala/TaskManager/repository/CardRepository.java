package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import own.drapala.TaskManager.domain.Card;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("SELECT c FROM Card c WHERE c.board_id = :boardId")
    Optional<List<Card>> findAllCardForGivenBoardId(Long boardId);
}
