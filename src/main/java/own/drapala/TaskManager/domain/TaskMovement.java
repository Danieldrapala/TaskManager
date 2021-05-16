package own.drapala.TaskManager.domain;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="task_drag_drop")
public class TaskMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "task_id")
    private Long task;

    @Column(name = "previous_card_id")
    private Long previousCard;

    @Column(name = "current_card_id")
    private Long currentCard;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    public TaskMovement(Long id, Long task, Long previousCard, Long currentCard, Timestamp timestamp) {
        this.id = id;
        this.task = task;
        this.previousCard = previousCard;
        this.currentCard = currentCard;
        this.timestamp = timestamp;
    }
    public TaskMovement() {

    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Long getCurrentCard() {
        return currentCard;
    }

    public void setCurrentCard(Long currentCard) {
        this.currentCard = currentCard;
    }

    public Long getPreviousCard() {
        return previousCard;
    }

    public void setPreviousCard(Long previousCard) {
        this.previousCard = previousCard;
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
