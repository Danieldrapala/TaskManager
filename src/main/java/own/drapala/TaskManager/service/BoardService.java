package own.drapala.TaskManager.service;

import own.drapala.TaskManager.service.dto.BoardDTO;

import java.util.Optional;

public interface BoardService {

    Optional<BoardDTO> getBoard(Long id);
    void addColumn(Long id);
    void deleteColumn(Long id);
    }
