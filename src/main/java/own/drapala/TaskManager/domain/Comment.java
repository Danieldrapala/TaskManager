package own.drapala.TaskManager.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private User createdBy;


    @Column(name = "description")
    @Size(max = 200)
    private String description;

    @Column(name = "timestamp")
    private Timestamp createdOn;

    @JoinColumn(name = "task_commented", referencedColumnName = "task_id")
    @ManyToOne
    private Task taskCommented;

    public Comment(Long id, User createdBy, @Size(max = 200) String description, Timestamp createdOn, Task taskCommented) {
        this.id = id;
        this.createdBy = createdBy;
        this.description = description;
        this.createdOn = createdOn;
        this.taskCommented = taskCommented;
    }

    public Comment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public Task getTaskCommented() {
        return taskCommented;
    }

    public void setTaskCommented(Task taskCommented) {
        this.taskCommented = taskCommented;
    }
}
