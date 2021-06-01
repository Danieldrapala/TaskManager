import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from '../model/board.model';
import { BoardService } from './board.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Task } from 'app/model/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'app/model/card.model';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  bsModalRef: BsModalRef | undefined;
  taskList: any[] = [];
  board: Board =new Board(1,"",0, 1, 4);
  cards: Card[]= [];
  constructor(private router: Router, private boardServiceImpl: BoardService, private bsModalService: BsModalService, route:ActivatedRoute) {
    route.params.subscribe(val => {
      this.getBoard();
      this.getTasks();
    }
    )
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

  createTask(){
    this.router.navigate(["./showtask",-1]);

  }
  
  showTask(task: Task){
    this.router.navigate(["./showtask", task.id]);
  }
}
