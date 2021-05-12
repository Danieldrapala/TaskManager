import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'app/model/task.model';
import { updateStatement } from 'typescript';
import { TaskService } from './task.service';

@Component({
  selector: 'show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {

  task: Task =new Task();

  updateState: boolean = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)

      this.taskService.getTask(params.id).subscribe(task =>{
        this.task = task;
      });
    });
  }


  isEditClicked(){
    return this.updateState;
  }
  updateStateTask(){
    this.updateState = true;

  }
  updateTask(): void {
    this.updateState = false;
    this.taskService.updateTask(this.task).subscribe(
      task=>{
        if(task)
        {

        }
      }
    );
  }

  deleteTask(): void {
    if(this.task.id)
    this.taskService.deleteTask(this.task.id).subscribe(
      data =>
      {
        this.router.navigate(['/tasks']);
      }
    )
  }
}