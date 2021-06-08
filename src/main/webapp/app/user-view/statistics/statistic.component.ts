import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'app/core/auth/account.model';
import { Board } from 'app/model/board.model';
import { Task } from 'app/model/task.model';
import { BoardService } from 'app/services/board.service';
import { TaskService } from 'app/services/task.service';
import { TeamListService } from 'app/services/teamlist.service';


@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})

export class StatisticComponent implements OnInit {

  board!: Board;
  cardsAndCount = new Map();
  checkedTasks = new FormControl();
  checkedUsers= new FormControl();

  tasks!: Task[];
  users!: Account[];

  constructor(private boardService: BoardService, private taskService: TaskService, private teamListService: TeamListService ) {
    this.getBoardInfo();
    this.getColumnsAndTaskCount();
    this.getUsers();
    this.getTasks();
   }

  ngOnInit(): void {

  }


  getTasks() {
    this.taskService.getTaskList().subscribe(
      list=>{
        if(list.body)
        this.tasks = list.body;
      }
    )
  }

  getUsers() {
    this.teamListService.getAllUsers().subscribe(
      userList=>{
        this.users = userList;
      }
    )
  }

  getBoardInfo(): void
  {
      this.boardService.getBoard().subscribe(
        board=>{
          if(board.body)
            this.board = board.body;
        }
      )
  }

  getColumnsAndTaskCount(): void {
    this.boardService.getCards().subscribe(
      data => {
        data.forEach(
          card=>{ 
            this.boardService.getTasksCount(card.id).subscribe(
              count=> { 
              if(card.name) 
                this.cardsAndCount.set(card.name,count);
            });
          });
        });
  }
  
  getTaskStatus()
  {

  }

  getTaskUserStatus(){

  }

  getInfoAboutTaskCompletness(){

  }
  
  getInfoAboutTaskDragAndDropHistory(){

  }
}
