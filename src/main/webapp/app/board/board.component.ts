import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { Column } from './column.model';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  bsModalRef: BsModalRef | undefined;
  taskList: any[] = [];

  constructor(private boardService: BoardService, private bsModalService: BsModalService ) { }

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('Research', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  getTasks() {
    // this.boardService.getTaskList().subscribe((data: any) => {
    //   Object.assign(this.taskList, data);
    // }, (error: any) => {
    //   console.log("Error while getting posts ", error);
    // });
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

  updateTask(taskId: number) {
    this.boardService.updateTask(taskId);

    this.bsModalRef = this.bsModalService.show(UpdateTaskComponent);
    this.bsModalRef.content.event.subscribe((result: string) => {
      if (result == 'OK') {
        setTimeout(() => {
          this.getTasks();
        }, 5000);
      }
    });
  }
  addColumn(){

  }
}
