package own.drapala.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Comment;
import own.drapala.TaskManager.service.dto.CommentDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("SELECT c FROM Comment c  " +
            "join Task t on c.taskCommented = t.id\n" +
            "WHERE c.taskCommented.id = :taskId")
    Optional<List<CommentDTO>> findAllCommentForGivenTaskId(Long taskId);

    @Modifying
    @Query("DELETE FROM Comment c  " +
            "WHERE c.taskCommented.id = :id")
    void deleteByTaskId(Long id);
}
