import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { Task } from 'app/model/task.model';
import { Card } from './card.model';

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
  constructor(private boardServiceImpl: BoardService, private bsModalService: BsModalService ) {
    this.boardServiceImpl.getBoard().subscribe( data =>{
      this.board =data
    });
    this.boardServiceImpl.getCards().subscribe( data =>{
      this.cards = data
      let i =0;
      data.forEach(aaa=>{
        this.boardServiceImpl.getTasks(aaa.id).subscribe( tasks=>{
          this.cards[i++].tasks=tasks;
        }
        )
      })

    });
  

  }
   


  ngOnInit() {
    
  }
  getTaskLists(){
    

  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.log(event.currentIndex);
        console.log(event.previousContainer);
        console.log(event.previousIndex);

        console.log(event.container);
        console.log(event.item);
    

        // this.boardServiceImpl.updateTaskColumn(event.item.data, event.container.id)
      }
  }
  getTasks() {
    // this.boardServiceImpl.getTaskList().subscribe((data: any) => {
    //   Object.assign(this.taskList, data);
    // }, (error: any) => {
    //   console.log("Error while getting posts ", error);
    // });
  }
  print(task: Task){
    console.log(task.id);

    console.log(task.name);
  }
  addTask() {
    this.bsModalRef = this.bsModalService.show(AddTaskComponent);
    this.bsModalRef.content.event.subscribe((result: string) => {
      if (result == 'OK') {
        this.getTasks();
      }
    });
  }

  deleteTask(taskId: number, title: string) {
    this.bsModalRef = this.bsModalService.show(DeleteTaskComponent);
    this.bsModalRef.content.taskId = taskId;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.event.subscribe((result: string) => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          this.taskList=[];
          this.getTasks();
        }, 5000);
      }
    });
  }


  addColumn(){

  }
}
