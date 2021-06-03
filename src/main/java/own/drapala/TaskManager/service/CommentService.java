package own.drapala.TaskManager.service;

import own.drapala.TaskManager.domain.Comment;
import own.drapala.TaskManager.service.dto.CommentDTO;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface CommentService {
    Optional<List<CommentDTO>> getCommentForTaskId(Long taskId);
    Comment createComment(CommentDTO commentDTO, Timestamp timestamp);
}
