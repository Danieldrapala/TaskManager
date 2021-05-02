package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.service.dto.BoardDTO;

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

}
