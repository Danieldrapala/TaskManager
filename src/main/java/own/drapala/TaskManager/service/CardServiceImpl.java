package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.service.dto.CardDTO;

import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;
    private BoardRepository boardRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, BoardRepository boardRepository) {
        this.cardRepository = cardRepository;
        this.boardRepository = boardRepository;
    }

    @Override
    public Optional<Card> getColumn(Long id) {
        return cardRepository.findById(id);
    }

    @Override
    public Card createColumn(CardDTO cardDTO){
        Card card = new Card();
        card.setName(cardDTO.getName());
        card.setPriority(cardDTO.getPriority());
        card.setBoard(boardRepository.getOne(cardDTO.getBoard()));
        cardRepository.save(card);
        return card;
    }

    @Override
    public Optional<List<Card>> getColumnForBoardId(Long boardId) {
        return cardRepository.findAllCardForGivenBoardId(boardId);
    }

    @Override
    public Optional<List<Task>> getTasksForCardId(long l) {
        return Optional.empty();
    }
}
