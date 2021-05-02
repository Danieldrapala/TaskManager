package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Card;

public class CardDTO {

    private Long id;
    private String name;
    private Long status;

    public CardDTO() {
        // Empty constructor needed for Jackson.
    }

    public CardDTO(Card card) {
        this.id = card.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.name = card.getName();
        this.status = card.getStatus();
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

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

}