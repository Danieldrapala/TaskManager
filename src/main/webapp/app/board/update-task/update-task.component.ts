import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BoardService } from '../board.service';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
    updateTaskForm: FormGroup;
    categories: any[] = [];
    taskId!: number;
    postData: any;
    event: EventEmitter<any> = new EventEmitter();
  
    constructor(private builder: FormBuilder, private boardService: BoardService, private bsModalRef: BsModalRef) {
      this.updateTaskForm = this.builder.group({
        category: new FormControl(null, []),
        title: new FormControl('', []),
        description: new FormControl('', [])
      });
  
  
      this.boardService.taskIdData.subscribe((data: number) => {
        this.taskId = data;
        if (this.taskId !== undefined) {
          this.boardService.getTask(this.taskId).subscribe((data: any) => {
            this.postData = data;
            
            if (this.updateTaskForm!=null && this.postData!=null) {
              this.updateTaskForm.controls['title'].setValue(this.postData.title);
              this.updateTaskForm.controls['description'].setValue(this.postData.description);
            }
          }, (error: any) => { console.log("Error while gettig post details") });
        }
      });
    }
  
    onTaskUpdateFormSubmit() {
      let taskData = {
        'TaskId': this.taskId,
        'Title': this.updateTaskForm.get('title')?.value,
        'Description': this.updateTaskForm.get('description')?.value,
      };
  
      this.boardService.updateTask(taskData).subscribe((data: any) => {      
          this.event.emit('OK');
          this.bsModalRef.hide();      
      });
    }
  
    onClose() {
      this.bsModalRef.hide();
    }
  
    ngOnInit() {
  
    }
  
  }