package own.drapala.TaskManager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long id;
    @NotEmpty(message = "{card.name.not.empty}")
    @Column(length = 1200)
    @Size(max = 1200, message = "{card.name.size}")
    private String name;
    @NotEmpty(message = "{card.status.not.empty}")
    private Long status;

    @JoinColumn(name ="board_id", referencedColumnName = "board_id")
    private Long board_id;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "task_assigned",
            joinColumns = { @JoinColumn(name = "card_id", referencedColumnName = "card_id") },
            inverseJoinColumns = { @JoinColumn(name = "task_id", referencedColumnName = "task_id") }
    )
    @BatchSize(size = 20)
    private final Set<Task> tasks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public Long getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Card() {
    }

    public Card(@NotEmpty String name,
                Long status) {
        this.name = name;
        this.status = status;
    }

    public Long getBoard_id() {
        return board_id;
    }

    public void setBoard_id(Long board_id) {
        this.board_id = board_id;
    }

    public Set<Task> getTasks() {
        return tasks;
    }
}
