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
    private Long priority;

    @JoinColumn(name ="board_id", referencedColumnName = "board_id")
    @ManyToOne
    private Board board;

    @OneToMany(mappedBy = "card")
    private List<Task> tasks = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public Long getPriority() {
        return priority;
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

    public void setPriority(Long priority) {
        this.priority = priority;
    }

    public Card() {
    }

    public Card(@NotEmpty String name,
                Long priority) {
        this.name = name;
        this.priority = priority;

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

}
