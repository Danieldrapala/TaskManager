import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Pagination } from "app/core/request/request.model";
import { Card, ICard } from "app/model/card.model";
import { ITask, Task } from "app/model/task.model";
import { Observable } from "rxjs";
import { IBoard } from "../model/board.model";

@Injectable({ providedIn: 'root' })
export class BoardService{
    
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/board');
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    getBoard():Observable<HttpResponse<IBoard>> {

      return this.http.get<IBoard>(`${this.resourceUrl}`, {observe: 'response' });
    }

    addBoard(board: IBoard):Observable<IBoard> {

      return this.http.post<IBoard>(`${this.resourceUrl}`, board);
    }

    updateBoard(board: IBoard):Observable<IBoard> {

      return this.http.put<IBoard>(`${this.resourceUrl}`, board);
    }

    addCard(card: Card):Observable<ICard> {

      return this.http.post<ICard>(`${this.resourceUrl}/card`, card);
    }

    getCards() :Observable<ICard[]>{
      let cards = this.http.get<ICard[]>(`${this.resourceUrl}/card`);
      return cards;
    }

    getTasks(cardId: number | undefined){
      return this.http.get<Task[]>(`${this.resourceUrl}/card/${cardId}`)
    }
    
    getTasksCount(cardId: number | undefined){
      return this.http.get<number>(`${this.resourceUrl}/card/count/${cardId}`)
    }
    
    getCard(cardId: number|undefined) {
      return this.http.get<ICard>(`${this.resourceUrl}/defaultcard/${cardId}`);

    }

    updateTaskColumn(previousIndex: string, currentIndex: string, taskId: number |undefined ) {
      return this.http.put<ITask>(`${this.resourceUrl}/draganddrop`, [previousIndex, currentIndex, taskId]);
    }
} 