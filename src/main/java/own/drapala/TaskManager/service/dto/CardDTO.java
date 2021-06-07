package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Card;

public class CardDTO {

    private Long id;
    private String name;
    private Long priority;
    private Long board;


    public CardDTO() {
        // Empty constructor needed for Jackson.
    }

    public CardDTO(Card card) {
        this.id = card.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.name = card.getName();
        this.priority = card.getPriority();
        this.board = card.getBoard().getId();

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

    public Long getPriority() {
        return priority;
    }

    public void setPriority(Long priority) {
        this.priority = priority;
    }


    public Long getBoard() {
        return board;
    }

    public void setBoard(Long board) {
        this.board = board;
    }
}