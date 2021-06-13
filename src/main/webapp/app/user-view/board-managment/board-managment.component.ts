import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'app/services/board.service';
import { Board } from 'app/model/board.model';
import { Card } from 'app/model/card.model';

@Component({
  selector: 'board-managment',
  templateUrl: './board-managment.component.html',
  styleUrls: ['./board-managment.component.scss']
})
export class BoardManagmentComponent implements OnInit {


  board!: Board;

  isSaving = false;
  cards!: Card[];
  
  editForm = this.fb.group({
    id: [],
    name: ["", [Validators.maxLength(50), Validators.required]],
    closingCard: [Validators.required],
    defaultCard: [Validators.required],
  });

  constructor(private boardService: BoardService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
   this.boardService.getBoard().subscribe(
     board =>
     {
       this.boardService.getCards().subscribe(
         cards =>
         {
           this.cards = cards;
           if(board.body){
            this.board = board.body;
            this.updateForm(this.board);
           }
         })
       
            }
   )
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateBoard(this.board);
    if (this.board.id !== undefined) {
      this.boardService.updateBoard(this.board).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
      }
    }

  private updateForm(board: Board): void {
    this.editForm.patchValue({
      id: board.id,
      name: board.name,
      defaultCard: board.defaultCard,
      closingCard: board.closingCard
      
    });
  }

  private updateBoard(board: Board): void {
    console.log(this.editForm.get(['defaultCard'])!.value);
    console.log(this.editForm.get(['closingCard'])!.value);

    board.name = this.editForm.get(['name'])!.value;
    board.defaultCard = this.editForm.get(['defaultCard'])!.value;
    board.closingCard = this.editForm.get(['closingCard'])!.value;
   
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
