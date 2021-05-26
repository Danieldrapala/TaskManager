package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.User;

import java.time.LocalDate;

public class BoardDTO {
    private Long id;
    private String name;
    private Card defaultCard;

    public BoardDTO() {
        // Empty constructor needed for Jackson.
    }

    public BoardDTO(Board board) {
        this.id = board.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.name = board.getName();
        this.defaultCard = board.getDefaultCard();
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


    public void setDefaultCard(Card defaultCard) {
        this.defaultCard = defaultCard;
    }

    public Card getDefaultCard() {
        return defaultCard;
    }
}

