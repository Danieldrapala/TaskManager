package own.drapala.TaskManager.service.dto;

import own.drapala.TaskManager.domain.Card;

public class CardDTO {

    private Long id;
    private String name;
    private Long status;
    private Boolean defaultState;
    private Boolean completedState;

    public CardDTO() {
        // Empty constructor needed for Jackson.
    }

    public CardDTO(Card card) {
        this.id = card.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.name = card.getName();
        this.status = card.getStatus();
        this.defaultState = card.isDefaultState();
        this.completedState = card.isCompletedState();

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

    public Boolean getDefaultState() {
        return defaultState;
    }

    public void setDefaultState(Boolean defaultState) {
        this.defaultState = defaultState;
    }

    public Boolean getCompletedState() {
        return completedState;
    }

    public void setCompletedState(Boolean completedState) {
        this.completedState = completedState;
    }
}