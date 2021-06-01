import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'app/board/board.service';
import { Account } from 'app/core/auth/account.model';

import { Task } from 'app/model/task.model';
import { AccountService } from 'app/services/account.service';
import { TeamListService } from 'app/services/teamlist.service';
import { TaskService } from '../services/task.service';
import { Location } from '@angular/common'

@Component({
  selector: 'show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {

  task: Task =new Task();
  users: Account[]= [];
  updateState: boolean = false;
  assignedTo?: Account;
  constructor(private location: Location,
    private teamListService: TeamListService,
     private boardService: BoardService, 
     private accountService: AccountService, 
     private route: ActivatedRoute, 
     private taskService: TaskService, 
     private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.teamListService.getAllUsers().subscribe(
        data=>{
          this.users = data
        }
      )
      if(params.id == -1)
      {
          this.task = new Task();
          this.updateState = true;

      }
      else{
        this.taskService.getTask(params.id).subscribe(task =>{
          this.task = task;
          this.updateState = false;
          this.teamListService.getUser(task.assignedTo?.login).subscribe(
            data=>
            {
              this.assignedTo = data;
            }
          );
        });
      }
      
    });
  }


  isEditClicked(){
    return this.updateState;
  }
  updateStateTask(){
    this.updateState = true;
  }

  goBack(){
    this.location.back()
  }

  createTask(){
  this.accountService.getAccount(this.accountService.getActiveUserId()!).subscribe(
    data=>{
      this.task.owner = data;
    }
  );
  this.boardService.getDefaultCard().subscribe(cardId=>{
    console.log(cardId);
    this.task.card =cardId;
    this.taskService.addTask(this.task).subscribe();
  });
  this.router.navigate(['./board']);
  }

  updateTask(): void {
    this.updateState = false;
    this.taskService.updateTask(this.task).subscribe();
  }
  assignToMe(): void{
     this.accountService.getAuthenticationState().subscribe(
       account =>{
         if(account)
          this.task.assignedTo = account; 
        this.taskService.updateTask(this.task).subscribe();
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