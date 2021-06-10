package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.BoardService;
import own.drapala.TaskManager.service.BoardServiceImpl;
import own.drapala.TaskManager.service.CardService;
import own.drapala.TaskManager.service.dto.BoardDTO;
import own.drapala.TaskManager.service.dto.TaskDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Observable;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BoardController {

    private static final Long BOARD_ID = 1L;

    @Value("${clientApp.name}")
    private String applicationName;
    private final BoardService boardService;
    private final CardService cardService;

    public BoardController(BoardService boardService, CardService cardService) {
        this.boardService = boardService;
        this.cardService = cardService;
    }

    @GetMapping("/board")
    public ResponseEntity<BoardDTO> getBoardInfo() {

        Optional<BoardDTO> board= boardService.getBoard(BOARD_ID);
        return ResponseUtil.wrapOrNotFound(
                board,
                HeaderUtil.createAlert(applicationName, "A Board is updated with identifier ","Board")
        );
    }

    @PostMapping("/board")
    public ResponseEntity<Board> addBoard(@RequestBody BoardDTO boardDTO) throws URISyntaxException {

        Board board= boardService.createBoard(boardDTO);
        return ResponseEntity
                .created(new URI("/api/board/" + board.getId()))
                .headers(
                        HeaderUtil.createAlert(applicationName, "A Board is created with identifier " + board.getId(), board.getName())
                )
                .body(board);
    }

    @PutMapping("/board")
    public ResponseEntity<BoardDTO> updateBoard(@Valid @RequestBody BoardDTO boardDTO) {

        Optional<BoardDTO> updateBoard;

        updateBoard= boardService.updateBoard(boardDTO);

        return ResponseUtil.wrapOrNotFound(
                updateBoard,
                HeaderUtil.createAlert(applicationName, "A Task is updated with identifier " + boardDTO.getId(), boardDTO.getName())
        );
    }

    @GetMapping("/board/defaultcard/{card_id}")
    public ResponseEntity<Card> getDefaultCard(@PathVariable Long card_id) {

        Card defaultCard= cardService.getColumn(card_id).get();
        return ResponseUtil.wrapOrNotFound(
                Optional.of(defaultCard),
                HeaderUtil.createAlert(applicationName, "A Board is updated with identifier ","Board")
        );
    }
}