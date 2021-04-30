package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.service.dto.CardDTO;

import java.util.List;
import java.util.Optional;

public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public Optional<Card> getColumn(Long id) {
        return cardRepository.findById(id);
    }

    @Override
    public Card createColumn(CardDTO cardDTO){
        Card card = new Card();
        card.setName(cardDTO.getName());
        card.setStatus(cardDTO.getStatus());
        cardRepository.save(card);
        return card;
    }

    @Override
    public Optional<List<Card>> getColumnForBoardId(Long boardId) {
        return cardRepository.findAllCardForGivenBoardId(boardId);
    }
}
