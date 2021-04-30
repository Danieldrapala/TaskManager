package own.drapala.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import own.drapala.TaskManager.domain.Board;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.repository.BoardRepository;
import own.drapala.TaskManager.service.dto.BoardDTO;

import java.util.Optional;

public class BoardServiceImpl implements BoardService{

    private BoardRepository boardRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Optional<BoardDTO> getBoard(Long id){

        return boardRepository.findById(id).map(BoardDTO::new);
    }

    @Override
    public void addColumn(Long id){
        Board board = boardRepository.getOne(id);
        board.setCards(board.getCards() + 1);
        boardRepository.save(board);
    }
    @Override
    public void deleteColumn(Long id){
        Board board = boardRepository.getOne(id);
        board.setCards(board.getCards()-1);
        boardRepository.save(board);
    }
}
