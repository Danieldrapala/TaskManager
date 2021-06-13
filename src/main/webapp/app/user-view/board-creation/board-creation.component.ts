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
  cards: Card[] =[];
  cardslength: number[] = [];
  boardFormName =
  this.fb.group({
    id: [],
    name: [ "", [Validators.required, ], ],
  });
  boardForm =  this.fb.group({
    id: [],
    closingCard: ["", Validators.required ],
    defaultCard: ["", Validators.required ],
  });


  board!: Board;
 
  constructor(private router: Router, private boardServiceImpl: BoardService, private route:ActivatedRoute, private fb:FormBuilder) {
    route.params.subscribe(val => {
      
    }
    )
  }
   
  ngOnInit() {

  }


  updateCardForm(name:string){
    this.boardForm.get('cardsName')?.patchValue(name);
  }

  saveCard(id:number){
    console.log(id)
    console.log( this.board.id)
    console.log( (<HTMLInputElement>document.getElementById(id.toString())).value);

    this.boardServiceImpl.addCard(new Card([],undefined, id, this.board.id,(<HTMLInputElement>document.getElementById(id.toString())).value)).subscribe(
      (data)=>{
        this.cards.push(data);
      }
    );

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
    
    this.cardslength.push(0);
  }


  private onSaveSuccess(): void {
    this.isSaving = false;
    
    this.router.navigate(['./']);
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  private updateBoardBeforeCardsInit(board: Board): void {

    board.name = this.boardFormName.get(['name'])!.value;

  }
  
  private updateBoardAfterCardsInit(board: Board): void {

    board.defaultCard = this.boardForm.get(['defaultCard'])!.value;
    board.closingCard = this.boardForm.get(['closingCard'])!.value;

  }
  

  getControlName(c: AbstractControl): string | undefined {
    return Object.keys(c.parent!.controls).find(name => c === c.parent!.get(name))
}

saveCardsAndUpdateBoard():void{
  this.updateBoardAfterCardsInit(this.board);
  this.boardServiceImpl.updateBoard(this.board).subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()

  )
  
}
  saveBoard(): void {
    this.isSaving = true;
    this.board = new Board();
    this.updateBoardBeforeCardsInit(this.board);
    
    this.boardServiceImpl.addBoard(this.board).subscribe(
      (        resultBoard: Board) => {
        this.board.id = resultBoard.id;

        },
        () => this.onSaveError()
      );
      
     
    }
  

  
 

}
