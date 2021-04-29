import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Pagination } from "app/core/request/request.model";
import { ITask, Task } from "app/model/task.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BoardService{

    taskIdSource = new  BehaviorSubject<number>(0);
    taskIdData: any;
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/board');
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
        this.taskIdData= this.taskIdSource.asObservable();
    }
    addTask(task: Task): Observable<ITask> {
      return this.http.post<ITask>(this.resourceUrl, task);
    }
  
    updateTask(task: Task): Observable<ITask> {
      return this.http.put<ITask>(this.resourceUrl, task);
    }
  
    getTask(id: number): Observable<ITask>  {
      return this.http.get<ITask>(`${this.resourceUrl}/${id}`);
    }
  
    getTaskList(req?: Pagination): Observable<HttpResponse<ITask[]>> {
      const options = createRequestOption(req);
      return this.http.get<ITask[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
  
    deleteTask(id: number): Observable<{}> {
      return this.http.delete(`${this.resourceUrl}/${id}`);
    }
  
} 