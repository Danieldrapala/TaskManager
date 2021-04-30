package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.BoardService;
import own.drapala.TaskManager.service.BoardServiceImpl;
import own.drapala.TaskManager.service.dto.BoardDTO;

import java.util.Optional;

@RequestMapping("/api")
public class BoardResource {

    private static final Long BOARD_ID = 1L;

    @Value("${clientApp.name}")
    private String applicationName;

    private final BoardService boardService;

    private final BoardRepository boardRepository;

    public BoardResource(BoardService boardService, BoardRepository boardRepository) {
        this.boardService = boardService;
        this.boardRepository = boardRepository;
    }

    @GetMapping("/board")
    public ResponseEntity<BoardDTO> getBoardInfo() {

        Optional<BoardDTO> board= boardService.getBoard(BOARD_ID);

        return ResponseUtil.wrapOrNotFound(
                board,
                HeaderUtil.createAlert(applicationName, "A Board is updated with identifier ","Board")
        );
    }

}