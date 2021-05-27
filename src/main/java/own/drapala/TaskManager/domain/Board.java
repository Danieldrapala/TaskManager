package own.drapala.TaskManager.domain;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;
    @NotEmpty(message = "{board.name.not.empty}")
    @Column(length = 1200)
    @Size(max = 1200, message = "{board.name.size}")
    private String name;

    private Long defaultCard;

    @OneToMany(mappedBy = "board")
    private List<Card> card;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCard(List<Card> card) {
        this.card = card;
    }

    public List<Card> getCard() {
        return card;
    }

    public Board() {
    }

    public Board(@NotEmpty String name) {
        this.name = name;
    }

    public Board(Long id) {
        this.id = id;
    }

    public Long getDefaultCard() {
        return defaultCard;
    }

    public void setDefaultCard(Long defaultCard) {
        this.defaultCard = defaultCard;
    }
}
