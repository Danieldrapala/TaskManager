package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.domain.TaskMovement;
import own.drapala.TaskManager.repository.TaskMovementRepository;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.CardService;
import own.drapala.TaskManager.service.TaskMovementService;
import own.drapala.TaskManager.service.TaskService;
import own.drapala.TaskManager.service.dto.TaskDTO;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/board")
@RestController
public class CardResource {

    @Value("${clientApp.name}")
    private String applicationName;

    private final CardService cardService;
    private final TaskService taskService;
    private final TaskMovementService taskMovementService;

    public CardResource(CardService cardService, TaskService taskService, TaskMovementService taskMovementService) {

        this.cardService = cardService;
        this.taskService = taskService;

        this.taskMovementService = taskMovementService;
    }

    @GetMapping("/card")
    public ResponseEntity<List<Card>> getCardForBoardId() {

        Optional<List<Card>> card = cardService.getColumnForBoardId(1L);
        return ResponseUtil.wrapOrNotFound(
                card,
                HeaderUtil.createAlert(applicationName, "A Board is updated with identifier ","Board")
        );
    }
    @GetMapping("/card/{id}")
    public ResponseEntity<List<Task>> getTasksForCardId(@PathVariable Long id) {

        Optional<List<Task>> task = taskService.getTasksForCardId(id);
        return ResponseUtil.wrapOrNotFound(
                task,
                HeaderUtil.createAlert(applicationName, "A Task list for column "+ id ,"Task")
        );
    }

    @PutMapping("/draganddrop")
    public ResponseEntity<TaskDTO> updateTaskCard(@RequestBody String[] ids) {

        //ids[2] taskid
        taskMovementService.saveTaskMovement(Long.valueOf(ids[0]),Long.valueOf(ids[1]),Long.valueOf(ids[2]));
        Card actualCard = cardService.getColumn(Long.valueOf(ids[1])).get();
        Optional<TaskDTO> task = taskService.updateTasksCard(actualCard, Long.valueOf(ids[2]));
        return ResponseUtil.wrapOrNotFound(
                task,
                HeaderUtil.createAlert(applicationName, "A Task id "+ ids[2] ,"Task")
        );
    }
}
