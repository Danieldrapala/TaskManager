package own.drapala.TaskManager.domain;


import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;
    @NotEmpty(message = "{task.name.not.empty}")
    private String name;
    @NotEmpty(message = "{task.description.not.empty}")
    @Column(length = 1200)
    @Size(max = 1200, message = "{task.description.size}")
    private String description;
    @NotNull(message = "{task.date.not.null}")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private boolean is_completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    public long daysLeftUntilDeadline(LocalDate date) {
        return ChronoUnit.DAYS.between(LocalDate.now(), date);
    }

    public Task() {
    }

    public Task(@NotEmpty String name,
                @NotEmpty @Size(max = 1200) String description,
                @NotNull LocalDate date,
                boolean is_completed) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.is_completed = is_completed;
    }

    public Task(@NotEmpty String name,
                @NotEmpty @Size(max = 1200) String description,
                @NotNull LocalDate date,
                boolean is_completed,
                User owner,
                Card card) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.is_completed = is_completed;
        this.owner = owner;
        this.card = card;
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
        return is_completed;
    }

    public void setCompleted(boolean is_completed) {
        is_completed = is_completed;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return is_completed == task.is_completed &&
                Objects.equals(id, task.id) &&
                name.equals(task.name) &&
                description.equals(task.description) &&
                date.equals(task.date) &&
                Objects.equals(owner, task.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, date, is_completed, owner);
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }
}