import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Task } from 'app/model/task.model';
import { Card } from './card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  bsModalRef: BsModalRef | undefined;
  taskList: any[] = [];
  board: Board =new Board(1,"",0);
  cards: Card[]= [];
  constructor(private router: Router, private boardServiceImpl: BoardService, private bsModalService: BsModalService ) {
  }
   
  ngOnInit() {
    this.getBoard();
    this.getTasks();
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.boardServiceImpl.updateTaskColumn(event.previousContainer.id, event.container.id, event.container.data[event.currentIndex]['id']).subscribe();
      }
  }
  getBoard(){
    this.boardServiceImpl.getBoard().subscribe( data =>{
      this.board =data
    });
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

  showTask(task: Task){
    this.router.navigate(["./showtask", task.id]);
  }
}
