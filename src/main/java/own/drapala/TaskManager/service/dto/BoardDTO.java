package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Board;

public class BoardDTO {
    private Long id;
    private String name;
    private Long defaultCard;
    private Long closingCard;

    public BoardDTO() {
        // Empty constructor needed for Jackson.
    }

    public BoardDTO(Board board) {
        this.id = board.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.name = board.getName();
        this.closingCard = board.getClosingCard();
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


    public void setDefaultCard(Long defaultCard) {
        this.defaultCard = defaultCard;
    }

    public Long getDefaultCard() {
        return defaultCard;
    }

    public Long getClosingCard() {
        return closingCard;
    }

    public void setClosingCard(Long closingCard) {
        this.closingCard = closingCard;
    }
}

