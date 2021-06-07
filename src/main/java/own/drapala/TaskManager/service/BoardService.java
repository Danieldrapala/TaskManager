package own.drapala.TaskManager.service;

import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.service.dto.BoardDTO;

import java.util.Optional;

public interface BoardService {

    Optional<BoardDTO> getBoard(Long id);
    Board createBoard(BoardDTO boardDTO);

    Optional<BoardDTO> updateBoard(BoardDTO boardDTO);
}
