import { EventEmitter } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { BoardService } from "../board.service";

@Component({
  selector: 'delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  taskId: number = -1;
  title: string= '';
  constructor(private bsModalRef: BsModalRef, private boardServiceImpl: BoardService) {

  }

  deleteTask() {
    this.boardServiceImpl.deleteTask(this.taskId).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();

  }
  ngOnInit() {
  }
}