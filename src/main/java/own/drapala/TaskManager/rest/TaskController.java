package own.drapala.TaskManager.rest;

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
import own.drapala.TaskManager.domain.Task;
import own.drapala.TaskManager.rest.errors.BadRequestAlertException;
import own.drapala.TaskManager.rest.utils.HeaderUtil;
import own.drapala.TaskManager.rest.utils.PaginationUtil;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.TaskAssignmentService;
import own.drapala.TaskManager.service.TaskService;
import own.drapala.TaskManager.service.dto.TaskDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TaskController {


    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Value("${clientApp.name}")
    private String applicationName;

    private final TaskService taskService;

    private final TaskAssignmentService taskAssignmentService;

    public TaskController(TaskService taskService, TaskAssignmentService taskAssignmentService) {
        this.taskService = taskService;
        this.taskAssignmentService = taskAssignmentService;

    }

    /**
     * {@code POST  /task}  : Creates a new task.
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
            if(task.getAssignedTo() != null) {
                this.taskAssignmentService.rememberAssingmentChange(task.getId(), task.getAssignedTo().getId());
            }
            else{
                this.taskAssignmentService.rememberAssingmentChange(task.getId(), 0L);

            }
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
    @GetMapping("/task/tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks(Pageable pageable) {
        log.info("REST request to get all tasks for an user");
        final Page<TaskDTO> page = taskService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/task/alltasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        log.info("REST request to get all tasks for an user");
        final Optional<List<TaskDTO>> tasks = taskService.findAll();
        return ResponseUtil.wrapOrNotFound(
                tasks,
                HeaderUtil.createAlert(applicationName, "A Task List size" + tasks.get().size(), "tasks List")
        );
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

    /**
     * {@code GET /api/task/:id} : get the "id" task.
     *
     * @param id the id of the task to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "id" task, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        log.debug("REST request to get Task : {}", id);
        return ResponseUtil.wrapOrNotFound(taskService.getTaskById(id));
    }

    @PutMapping("/task/complete")
    public ResponseEntity<TaskDTO> completeTask( @RequestBody Long[] ids) {

        Optional<TaskDTO> taskDTO = taskService.setTaskCompleted(ids[0], ids[1]);

        return ResponseUtil.wrapOrNotFound(
                taskDTO,
                HeaderUtil.createAlert(applicationName, "A Task is completed with identifier " + taskDTO.get().getId(), taskDTO.get().getName())
        );
    }

}