package own.drapala.TaskManager.service;

import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.service.dto.CardDTO;

import java.util.List;
import java.util.Optional;

public interface CardService {
    Optional<Card> getColumn(Long id);
    Card createColumn(CardDTO cardDTO);

    Optional<List<Card>> getColumnForBoardId(Long boardId);
}
