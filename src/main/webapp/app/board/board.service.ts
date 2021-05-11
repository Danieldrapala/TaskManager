import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Pagination } from "app/core/request/request.model";
import { ITask, Task } from "app/model/task.model";
import { Observable } from "rxjs";
import { IBoard } from "./board.model";
import { ICard } from "./card.model";

@Injectable({ providedIn: 'root' })
export class BoardService{
    
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/board');
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }
    getBoard():Observable<IBoard> {
      return this.http.get<IBoard>(`${this.resourceUrl}`);
    }

    getCards() :Observable<ICard[]>{
      let cards = this.http.get<ICard[]>(`${this.resourceUrl}/card`);
      return cards;
    }

    getTasks(cardId: number|undefined){
      return this.http.get<Task[]>(`${this.resourceUrl}/card/${cardId}`)
    }

    updateTaskColumn(previousIndex: string, currentIndex: string, taskId: number |undefined ) {
      return this.http.put<ITask>(`${this.resourceUrl}/draganddrop`, [previousIndex, currentIndex, taskId]);
    }
} 