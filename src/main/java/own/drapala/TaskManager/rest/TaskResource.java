package own.drapala.TaskManager.rest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import own.drapala.TaskManager.domain.Card;
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.repository.CardRepository;
import own.drapala.TaskManager.repository.TaskRepository;
import own.drapala.TaskManager.rest.errors.BadRequestAlertException;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.PaginationUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.CardService;
import own.drapala.TaskManager.service.TaskService;
import own.drapala.TaskManager.service.dto.TaskDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/board")
public class TaskResource {


    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Value("${clientApp.name}")
    private String applicationName;

    private final TaskService taskService;

    private final CardRepository cardRepository;

    private final TaskRepository taskRepository;

    public TaskResource(TaskService taskService, TaskRepository taskRepository, CardRepository cardRepository) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
        this.cardRepository = cardRepository;
    }

    /**
     * {@code POST  /api/task}  : Creates a new task.
     * <p>
     * Creates a new task
     * The user needs to be activated on creation.
     *
     * @param taskDTO the task to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task, or with status {@code 400 (Bad Request)}.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to save Task : {}", taskDTO);

        if (taskDTO.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", "task", "idexists");
        } else {
            Task task = taskService.createTask(taskDTO);
            return ResponseEntity
                    .created(new URI("/api/task/" + task.getId()))
                    .headers(
                            HeaderUtil.createAlert(applicationName, "A Task is created with identifier " + task.getId(), task.getName())
                    )
                    .body(task);
        }
    }

    /**
     * {@code PUT /api/task} : Updates an existing Task.
     *
     * @param taskDTO the task to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task.

     */
    @PutMapping("/task")
    public ResponseEntity<TaskDTO> updateTask(@Valid @RequestBody TaskDTO taskDTO) {
        log.debug("REST request to update Task : {}", taskDTO);

        Optional<TaskDTO> updatedTask= taskService.updateTask(taskDTO.getId(),taskDTO);

        return ResponseUtil.wrapOrNotFound(
                updatedTask,
                HeaderUtil.createAlert(applicationName, "A Task is updated with identifier " + taskDTO.getId(), taskDTO.getName())
        );
    }

    /**
     * {@code GET /api/tasks} : get all tasks with all the details.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all tasks.
     */
    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks(Pageable pageable) {
        log.debug("REST request to get all tasks for an user");
        final Page<TaskDTO> page = taskService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * {@code DELETE /api/task/:id} : delete the  Task.
     *
     * @param id the id of the task to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.debug("REST request to delete User: {}", id);
        taskService.deleteTask(id);
        return ResponseEntity
                .noContent()
                .headers(HeaderUtil.createAlert(applicationName, "A task is deleted with identifier " + id, String.valueOf(id)))
                .build();
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
        Card actualCard = cardRepository.getOne(Long.valueOf(ids[1]));
        Optional<TaskDTO> task = taskService.updateTasksCard(actualCard, Long.valueOf(ids[2]));
        return ResponseUtil.wrapOrNotFound(
                task,
                HeaderUtil.createAlert(applicationName, "A Task id "+ ids[2] ,"Task")
        );
    }
}