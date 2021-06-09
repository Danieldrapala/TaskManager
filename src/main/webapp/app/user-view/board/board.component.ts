import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Task } from 'app/model/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'app/model/card.model';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { stat } from 'node:fs';
import { Console } from 'node:console';
import { BoardService } from 'app/services/board.service';
import { Board, IBoard } from 'app/model/board.model';
import { AccountService } from 'app/services/account.service';
import { AccessorDeclaration } from 'typescript';
import { Account } from 'app/core/auth/account.model';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  

  taskList: any[] = [];
  board?: Board;
  cards: Card[]= [];
  status!: HttpResponse<IBoard>;
  user!: Account;

  constructor(
    private router: Router, 
    private boardServiceImpl: BoardService, 
    private accountService: AccountService,
    private route:ActivatedRoute, 
    private fb:FormBuilder,
    private taskService: TaskService) {
    route.params.subscribe(val => {
      accountService.getAuthenticationState().subscribe(
        (data)=> {
          if(data)
          this.user = data;}
      )
      this.getBoard();      
      this.getTasks();
      });
  
  }
   
  ngOnInit() {

    this.getBoard();
    if(this.board)
    {
      this.getTasks();
    }
 
  }

  noMethod(){

  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.boardServiceImpl.updateTaskColumn(event.previousContainer.id, event.container.id, event.container.data[event.currentIndex]['id']).subscribe(
        data =>{
          if(event.container.id == this.board?.closingCard?.toString()){
            this.taskService.completeTask(event.container.data[event.currentIndex]['id']!, this.user.id).subscribe(
                        ()=> this.getTasks())
          } 
        });
      }
  }

  getBoard(){
    this.boardServiceImpl.getBoard().subscribe( data =>{
        if(data.body)
        {
          this.board =data.body;
        }
    },
    (status) => {
      if(status.status === 404)
      this.router.navigate(["./addboard"]);

    }
    
    );
  }
  getTasks() {
    this.boardServiceImpl.getCards().subscribe( cards =>{
      this.cards = cards
      cards.sort((a,b)=>a.id! - b.id!).forEach(card=>{
        this.boardServiceImpl.getTasks(card.id).subscribe( tasks=>{
          this.cards[card.id!-1].tasks=tasks;
        })
      })
    });
  }

  createTask(){
    this.router.navigate(["./showtask",-1]);

  }
  
  showTask(task: Task){
    this.router.navigate(["./showtask", task.id]);
  }
  
}
