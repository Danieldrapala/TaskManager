package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.service.dto.BoardDTO;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Optional<BoardDTO> getBoard(Long id){
        return boardRepository.findById(id).map(BoardDTO::new);
    }
    @Override
    public Board createBoard(BoardDTO boardDTO){
        Board board = new Board();
        board.setName(boardDTO.getName());
        board.setDefaultCard(boardDTO.getDefaultCard());
        board.setClosingCard(boardDTO.getClosingCard());
        boardRepository.save(board);

        return board;
    }

    @Override
    public Optional<BoardDTO> updateBoard( BoardDTO updatedBoard) {
        Long id = updatedBoard.getId();
        return Optional
                .of(boardRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(board -> {
                    board.setName(updatedBoard.getName());
                    board.setClosingCard(updatedBoard.getClosingCard());
                    board.setDefaultCard(updatedBoard.getDefaultCard());
                    boardRepository.save(board);
                    return board;
                })
                .map(BoardDTO::new);
    }
}