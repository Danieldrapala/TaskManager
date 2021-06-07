import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from '../../model/board.model';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Task } from 'app/model/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'app/model/card.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'app/services/board.service';

@Component({
  selector: 'board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.scss']
})
export class BoardCreationComponent implements OnInit {
  
  isSaving = false;

  boardForm =  this.fb.group({
    id: [],
    name: [ "", [Validators.required, ], ],
    closingCard: ["", Validators.required ],
    defaultCard: ["", Validators.required ],
    cardsName: this.fb.array([
      this.fb.control('')
    ]),

  });

  board!: Board;
 
  constructor(private router: Router, private boardServiceImpl: BoardService, private route:ActivatedRoute, private fb:FormBuilder) {
    route.params.subscribe(val => {
      this.board = new Board();
    }
    )
  }
   
  ngOnInit() {

  }


  updateCardForm(name:string){
    this.boardForm.get('cardsName')?.patchValue(name);
  }
  
  private updateBoardForm(board: Board): void {

    this.boardForm.patchValue({
      id: board.id,
      name: board.name,
      closingColumn: board.closingCard,
      defaultColumn: board.defaultCard
    });
  }

  get cardsName() {
    return this.boardForm.get('cardsName') as FormArray;
  }

  addCard(): void {
    
    this.cardsName.push(
      this.fb.control('')
    );
  }


  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  private updateBoardBeforeCardsInit(board: Board): void {

    board.name = this.boardForm.get(['name'])!.value;

  }
  


  getControlName(c: AbstractControl): string | undefined {
    return Object.keys(c.parent!.controls).find(name => c === c.parent!.get(name))
}
  saveBoard(): void {
    this.isSaving = true;
    this.updateBoardBeforeCardsInit(this.board);
    
    this.boardServiceImpl.addBoard(this.board).subscribe(
      (        resultBoard: Board) => {
        this.board.id = resultBoard.id;
          this.cardsName.controls.forEach(
            (element: AbstractControl) => {
              console.log(element.status)
              let card = new Card([],undefined, +this.getControlName(element)! ,resultBoard.id, element.value)
              this.boardServiceImpl.addCard(card).subscribe(
                card => {
                  if(element.value ===  this.boardForm.get(['closingCard'])!.value
                  )
                  {
                    this.board.closingCard = card.id;
                    this.boardServiceImpl.updateBoard(this.board).subscribe();

                  }
                  if(element.value ===  this.boardForm.get(['defaultCard'])!.value
                  )
                  {
                    this.board.defaultCard = card.id;
                    this.boardServiceImpl.updateBoard(this.board).subscribe();

                  }
                }
              );
          });
          this.onSaveSuccess()

        },
        () => this.onSaveError()
      );
      
     
    }
  

  
 

}
