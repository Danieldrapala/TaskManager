package own.drapala.TaskManager.domain;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="task_assignment")
public class TaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "task_id")
    private  Long task;

    @Column(name = "assigned_to_id")
    private  Long user;

    @Column(name = "timestamp")
    private Timestamp status;

    public TaskAssignment(Long id, Long task, Long user, Timestamp status) {
        this.id = id;
        this.task = task;
        this.user = user;
        this.status = status;
    }
    public TaskAssignment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTask() {
        return task;
    }

    public void setTask(Long task) {
        this.task = task;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Timestamp getStatus() {
        return status;
    }

    public void setStatus(Timestamp status) {
        this.status = status;
    }
}
