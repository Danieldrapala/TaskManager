import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'app/model/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {

  task: any = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)

      this.taskService.getTask(params.id).subscribe(task =>{
        this.task = task;
        console.log(task.card);
        console.log(task.id);
        console.log(task.date);
        console.log(task.name);
        console.log(this.task.card);
        console.log(this.task.id);
        console.log(this.task.date);
        console.log(this.task.name);
      });
    });
  }



  updateTask(): void {
    // this.taskService.updateTask();
  }

  deleteTask(): void {
    // this.taskService.updateTask();
  }
}