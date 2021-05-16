package own.drapala.TaskManager.domain;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "task_completed")
public class TaskCompleted {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "task_id")
    private Long task;

    @Column(name = "completed_by")
    private Long completedBy;

    @Column(name = "timestamp")
    private Timestamp status;

    public TaskCompleted(Long id, Long task, Long completedBy, Timestamp status) {
        this.id = id;
        this.task = task;
        this.completedBy = completedBy;
        this.status = status;
    }
    public TaskCompleted() {
    }

    public Timestamp getStatus() {
        return status;
    }

    public void setStatus(Timestamp status) {
        this.status = status;
    }

    public Long getCompletedBy() {
        return completedBy;
    }

    public void setCompletedBy(Long completedBy) {
        this.completedBy = completedBy;
    }

    public Long getTask() {
        return task;
    }

    public void setTask(Long task) {
        this.task = task;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
