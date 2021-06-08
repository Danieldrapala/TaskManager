import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'app/services/board.service';
import { Account } from 'app/core/auth/account.model';

import { Task } from 'app/model/task.model';
import { AccountService } from 'app/services/account.service';
import { TeamListService } from 'app/services/teamlist.service';
import { TaskService } from '../../services/task.service';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'app/model/comment.model';
import { CommentService } from 'app/services/comment.service';
import { ignoreElements } from 'rxjs/operators';
import { CommaExpr, ThrowStmt } from '@angular/compiler';
import { Board } from 'app/model/board.model';

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
    completed: ['', ],
    owner: [],
    assignedTo: [],
    card: [],  
    date: []
  });
  task!: Task;
  users: Account[]= [];
  updateState: boolean = false;
  assignedTo!: Account;
  comments: Comment[] = [];
  params!: number;
  board!: Board;
  constructor(private location: Location,
    private teamListService: TeamListService,
     private boardService: BoardService, 
     private accountService: AccountService, 
     private route: ActivatedRoute, 
     private taskService: TaskService, 
     private fb: FormBuilder,
     private commentService: CommentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.boardService.getBoard().subscribe(
        data => {
          if(data.body)
          this.board = data.body;
        }
      )
      this.params = params.id;
      this.teamListService.getAllUsers().subscribe(
        data=>{
          this.users = data
        }
      )
      if(params.id == -1)
      {
        this.task = new Task();
        this.updateForm(this.task);

      }
      else{
        this.taskService.getTask(params.id).subscribe(task =>{
          this.task = task;
          this.getAllComments(task);
          if(task.assignedTo){
            this.teamListService.getUser(task.assignedTo?.login).subscribe(
            data=>
            {
              this.assignedTo = data;
              this.taskForm.get('assignedTo')?.setValue(this.assignedTo.id);
            });
          }

        this.updateForm(task);
      });
      }
      
    });
  }

  getAllComments(task:Task){
    if(task.id!= undefined)
          {
            this.commentService.getComments(task.id).subscribe(
              data=>{
                this.comments = data
              }
            );
          }
  }



  assignToMe(): void{
    
     this.accountService.getAuthenticationState().subscribe(
       account =>{
        if(account)
       {   
        this.task.assignedTo = account; 

         if(this.params != -1)
         {
          this.taskService.updateTask(this.task).subscribe();
         }
         this.updateForm(this.task);
         this.taskForm.get('assignedTo')?.setValue(account.id);
        }
      }
     );
     

  }


  addComment(description:string){
    let comment = new Comment();  
    this.accountService.getAuthenticationState().subscribe(
      user =>{
        if(user)
        comment.createdBy =  user;
        comment.description = description;
        comment.taskId = this.task.id;
    
        this.commentService.addComment(comment).subscribe(
          data=> {
          this.getAllComments(this.task);
        }
        );
      }
      );
    

  }


  private updateForm(task: Task): void {

    this.taskForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      assignedTo: task.assignedTo,
      card: task.card,
      completed: task.completed,
      owner: task.owner,
      date: task.date,
    });
  }

  private updateTask(task: Task): void {

    task.date = this.taskForm.get(['date'])!.value;
    task.owner = this.taskForm.get(['owner'])!.value;
    task.completed = this.taskForm.get(['completed'])!.value;
    if(this.taskForm.get(['assignedTo'])!.value)
    {
      task.assignedTo = this.users.find(x => x.id == this.taskForm.get(['assignedTo'])!.value)
    }
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
          this.boardService.getCard(this.board.defaultCard).subscribe(cardId=>{
            this.task.card =cardId;
            this.taskService.addTask(this.task).subscribe(
              () => this.onSaveSuccess(),
              () => this.onSaveError()
            );
          });
        }
      );
      
     
    }
  }

  
  goBack(){
    this.location.back()
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

}