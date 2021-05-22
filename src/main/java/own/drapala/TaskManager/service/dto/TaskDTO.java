package own.drapala.TaskManager.service.dto;

import org.apache.commons.lang3.ObjectUtils;
import own.drapala.TaskManager.domain.Task;

import java.time.LocalDate;

public class TaskDTO {

    private Long id;
    private String name;
    private String description;
    private LocalDate date;
    private boolean isCompleted;
    private Long owner;
    private Long card;
    private Long assignedTo;


    public TaskDTO() {
        // Empty constructor needed for Jackson.
    }

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.date = task.getDate();
        this.isCompleted = task.isCompleted();
        if(!ObjectUtils.isEmpty(task.getOwner()))
         this.owner = task.getOwner().getId();
        else
            this.owner = 0L;
        if(!ObjectUtils.isEmpty(task.getCard()))
            this.card = task.getCard().getId();
        else
            this.card = 0L;
        this.card = task.getCard().getId();
        if(!ObjectUtils.isEmpty(task.getAssignedTo()))
            this.assignedTo = task.getAssignedTo().getId();
        else
            this.assignedTo = 0L;
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


    public Long getOwner() {
        return owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public Long getCard() {
        return card;
    }

    public void setCard(Long card) {
        this.card = card;
    }

    public Long getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Long assignedTo) {
        this.assignedTo = assignedTo;
    }
}