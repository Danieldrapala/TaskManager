package own.drapala.TaskManager.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import own.drapala.TaskManager.rest.utils.ResponseUtil;
import own.drapala.TaskManager.service.CommentService;
import own.drapala.TaskManager.service.StatisticsService;
import own.drapala.TaskManager.service.dto.AdminUserDTO;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatisticsResource {

    @Value("${clientApp.name}")
    private String applicationName;

    private final StatisticsService statisticService;

    public StatisticsResource(StatisticsService statisticService) {

        this.statisticService = statisticService;

    }
    @GetMapping("/assignedtasks/{id}")
    public ResponseEntity<List<Long>> getAssignedToCount(@PathVariable Long id) {
        return ResponseUtil.wrapOrNotFound(statisticService.getAssignedToCountOnUser(id));
    }
    @GetMapping("/completedtasks/{id}")
    public ResponseEntity<List<Long>> getCompletedTasks(@PathVariable Long id) {
        return ResponseUtil.wrapOrNotFound(statisticService.getCompletedTasksCountOnUser(id));
    }
}
