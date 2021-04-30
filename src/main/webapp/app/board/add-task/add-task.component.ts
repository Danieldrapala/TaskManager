import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'app/model/task.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BoardService } from '../board.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  addNewTaskForm: FormGroup;
  categories: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private boardServiceImpl: BoardService, private bsModalRef: BsModalRef) {
    this.addNewTaskForm = this.builder.group({
      category: new FormControl(null, [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

  }

  onTaskFormSubmit(){
    if(this.addNewTaskForm.valid){
    let task = new Task(undefined,this.addNewTaskForm.get('title')?.value,this.addNewTaskForm.get('description')?.value,undefined,false,undefined)
    this.boardServiceImpl.addTask(task).subscribe()
  }
}

  onClose(){
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}