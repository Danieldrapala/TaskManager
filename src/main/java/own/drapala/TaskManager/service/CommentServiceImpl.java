package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Comment;
import own.drapala.TaskManager.repository.CommentRepository;
import own.drapala.TaskManager.repository.TaskRepository;
import own.drapala.TaskManager.repository.UserRepository;
import own.drapala.TaskManager.service.dto.CommentDTO;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{


    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private TaskRepository taskRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, TaskRepository taskRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;

    }

    @Override
    public Optional<List<CommentDTO>> getCommentForTaskId(Long taskId) {
        return commentRepository.findAllCommentForGivenTaskId(taskId);
    }

    @Override
    public Comment createComment(CommentDTO commentDTO, Timestamp timestamp){
        Comment comment = new Comment();
        comment.setDescription(commentDTO.getDescription());
        comment.setCreatedBy(userRepository.getOne(commentDTO.getCreatedBy().getId()));
        comment.setCreatedOn(timestamp);
        comment.setTaskCommented(taskRepository.getOne(commentDTO.getTaskId()));
        commentRepository.save(comment);
        return comment;
    }
}
