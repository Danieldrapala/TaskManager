import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'app/board/board.service';
import { Account } from 'app/core/auth/account.model';

import { Task } from 'app/model/task.model';
import { AccountService } from 'app/services/account.service';
import { TeamListService } from 'app/services/teamlist.service';
import { TaskService } from '../services/task.service';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {

  isSaving = false;

  taskForm =  this.fb.group({
    id: [],
    name: [ '', [Validators.required, ], ],
    description: ['', [Validators.required, Validators.maxLength(50)] ],
    isCompleted: ['', ],
    owner: [],
    assignedTo: [],
    card: [],  
    date: []
  });
  task!: Task;
  users: Account[]= [];
  updateState: boolean = false;
  assignedTo!: Account;
  constructor(private location: Location,
    private teamListService: TeamListService,
     private boardService: BoardService, 
     private accountService: AccountService, 
     private route: ActivatedRoute, 
     private taskService: TaskService, 
     private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamListService.getAllUsers().subscribe(
        data=>{
          this.users = data
        }
      )
      if(params.id == -1)
      {
          this.updateState = true;

      }
      else{
        this.taskService.getTask(params.id).subscribe(task =>{
          this.task = task;
          this.updateState = false;
          if(task.assignedTo){
            this.teamListService.getUser(task.assignedTo?.login).subscribe(
            data=>
            {
              console.log("XD"+ data.login)
              this.assignedTo = data;
              console.log('kappa');
              this.taskForm.get('assignedTo')?.setValue(this.assignedTo.id);
            });
          }
  

        this.updateForm(task);
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


  assignToMe(): void{
     this.accountService.getAuthenticationState().subscribe(
       account =>{
        if(account)
       {   
         this.task.assignedTo = account; 
         this.taskService.updateTask(this.task).subscribe();
         this.updateForm(this.task);
         this.taskForm.get('assignedTo')?.setValue(account.id);
        }
      }
     );
     

  }

  deleteTask(): void {
    if(this.task.id)
    this.taskService.deleteTask(this.task.id).subscribe(
      data =>
      {
        this.goBack();
      }
    )
  }

  private updateForm(task: Task): void {

    this.taskForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      assignedTo: task.assignedTo,
      card: task.card,
      isCompleted: task.isCompleted,
      owner: task.owner,
      date: task.date,
    });
  }

  private updateTask(task: Task): void {
    console.log("XD"+ this.taskForm.get(['assignedTo'])!.value)

    task.date = this.taskForm.get(['date'])!.value;
    task.owner = this.taskForm.get(['owner'])!.value;
    task.isCompleted = this.taskForm.get(['isCompleted'])!.value;
    if(this.taskForm.get(['assignedTo'])!.value)
    task.assignedTo = this.users.find(x => x.id == this.taskForm.get(['assignedTo'])!.value)
    
    task.description = this.taskForm.get(['description'])!.value;
    task.name = this.taskForm.get(['name'])!.value;
  }


  private onSaveSuccess(): void {
    this.isSaving = false;
    this.goBack();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  save(): void {
    this.updateState = false;
    this.isSaving = true;
    this.updateTask(this.task);
    if (this.task.id !== undefined) {
      this.taskService.updateTask(this.task).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.accountService.getAccount(this.accountService.getActiveUserId()!).subscribe(
        data=>{
          this.task.owner = data;
        }
      );
      this.boardService.getDefaultCard().subscribe(cardId=>{
        this.task.card =cardId;
        this.taskService.addTask(this.task).subscribe();
      });
      this.taskService.addTask(this.task).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }
}