package own.drapala.TaskManager.domain;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

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

    @NotEmpty(message = "{card.default.not.empty}")
    @Column(name = "default")
    private Boolean defaultState;

    @Column(name = "completed_state")
    private Boolean completedState;

    @JoinColumn(name ="board_id", referencedColumnName = "board_id")
    @ManyToOne
    private Board board;

    @OneToMany(mappedBy = "card")
    private List<Task> tasks = new ArrayList<>();

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
                Long status, @NotEmpty(message = "{card.default.not.empty}") boolean defaultState, boolean completedState) {
        this.name = name;
        this.status = status;
        this.defaultState = defaultState;
        this.completedState = completedState;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board_id) {
        this.board = board_id;
    }

    public List<Task> getTasks() {
        return tasks;
    }
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public Boolean isCompletedState() {
        return completedState;
    }

    public void setCompletedState(Boolean completedState) {
        this.completedState = completedState;
    }

    public Boolean isDefaultState() {
        return defaultState;
    }

    public void setDefaultState(Boolean defaultState) {
        this.defaultState = defaultState;
    }
}
