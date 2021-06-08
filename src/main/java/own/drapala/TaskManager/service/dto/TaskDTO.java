package own.drapala.TaskManager.service.dto;

import org.apache.commons.lang3.ObjectUtils;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;

import java.time.LocalDate;

public class TaskDTO {

    private Long id;
    private String name;
    private String description;
    private LocalDate date;
    private boolean isCompleted;
    private User owner;
    private Card card;
    private User assignedTo;


    public TaskDTO() {
        // Empty constructor needed for Jackson.
    }

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.date = task.getDate();
        this.isCompleted = task.getCompleted();
        this.owner = task.getOwner();
        this.card = task.getCard();
        this.assignedTo = task.getAssignedTo();

    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }


    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }
}