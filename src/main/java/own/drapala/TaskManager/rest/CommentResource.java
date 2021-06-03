package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Comment;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.PaginationUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.CardService;
import own.drapala.TaskManager.service.CommentService;
import own.drapala.TaskManager.service.TaskMovementService;
import own.drapala.TaskManager.service.TaskService;
import own.drapala.TaskManager.service.dto.CommentDTO;
import own.drapala.TaskManager.service.dto.TaskDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RequestMapping("/api/task")
@RestController
public class CommentResource {

    @Value("${clientApp.name}")
    private String applicationName;

    private final CommentService commentService;

    public CommentResource(CommentService commentService) {

        this.commentService = commentService;

    }

    /**
     * {@code GET /api/comments} : get all tasks with all the details.
     *
     * @param taskId to get comments only for specific task
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all tasks.
     */
    @GetMapping("/comment/{taskId}")
    public ResponseEntity<List<CommentDTO>> getAllComments(@PathVariable Long taskId) {
        Optional<List<CommentDTO>> comment = commentService.getCommentForTaskId(taskId);
        return ResponseUtil.wrapOrNotFound(
                comment,
                HeaderUtil.createAlert(applicationName, "A comments fetched for task" +taskId, taskId.toString())
        );
    }
    @PostMapping("/comment")
    public ResponseEntity<Comment> createComment(@Valid @RequestBody CommentDTO commentDTO) throws URISyntaxException {

        System.out.println(commentDTO.getTaskId() +" "+ commentDTO.getCreatedBy() );
        Comment comment = commentService.createComment(commentDTO, Timestamp.from(Instant.now()));
        return ResponseEntity
                .created(new URI("/api/task/" + comment.getId()))
                .headers(
                        HeaderUtil.createAlert(applicationName, "A Task is created with identifier " + comment.getId(), comment.getDescription())
                )
                .body(comment);
    }

}
