package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Card;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("SELECT c FROM Card c  " +
            "JOIN  Board b on c.board = b.id\n" +
            "WHERE b.id = :board_id")
    Optional<List<Card>> findAllCardForGivenBoardId(Long board_id);
}
