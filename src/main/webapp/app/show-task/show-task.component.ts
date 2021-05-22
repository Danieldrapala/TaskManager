import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'app/board/board.service';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { TeamListService } from 'app/entities/teamlist/teamlist.service';
import { Task } from 'app/model/task.model';
import { TaskService } from './task.service';

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
  constructor(private teamListService: TeamListService, private boardService: BoardService, private accountService: AccountService, private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

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
          this.teamListService.getUser(task.assignedTo).subscribe(
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

  goBackToBoard(){
    this.router.navigate(['./board']);
  }

  createTask(){
  this.task.owner = this.accountService.getActiveUserId();
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
        this.task.assignedTo = account?.id; ;
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