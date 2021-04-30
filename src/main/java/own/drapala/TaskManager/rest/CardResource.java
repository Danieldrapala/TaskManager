package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.BoardServiceImpl;
import own.drapala.TaskManager.service.CardService;
import own.drapala.TaskManager.service.dto.BoardDTO;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
public class CardResource {

    @Value("${clientApp.name}")
    private String applicationName;

    private final CardService cardService;

    private final CardRepository cardRepository;

    public CardResource(CardService cardService, CardRepository cardRepository) {
        this.cardService = cardService;
        this.cardRepository = cardRepository;
    }

    @GetMapping("/card")
    public ResponseEntity<List<Card>> getCardForBoardId(Long boardId) {

        Optional<List<Card>> card = cardService.getColumnForBoardId(boardId);
        return ResponseUtil.wrapOrNotFound(
                card,
                HeaderUtil.createAlert(applicationName, "A Board is updated with identifier ","Board")
        );
    }



}
