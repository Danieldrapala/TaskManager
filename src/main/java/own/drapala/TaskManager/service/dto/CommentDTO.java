package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Comment;
import own.drapala.TaskManager.domain.User;

public class CommentDTO {

    private Long id;
    private String description;
    private User createdBy;
    private Long createdOn;
    private Long taskId;

    public CommentDTO() {
        // Empty constructor needed for Jackson.
    }

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.description = comment.getDescription();
        this.createdBy = comment.getCreatedBy();
        this.createdOn = comment.getCreatedOn().getTime();
        this.taskId = comment.getTaskCommented().getId();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Long getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Long createdOn) {
        this.createdOn = createdOn;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
}
