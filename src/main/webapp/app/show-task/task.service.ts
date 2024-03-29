import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Pagination } from "app/core/request/request.model";
import { ITask, Task } from "app/model/task.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TaskService{
    
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/task');
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    getTask(id: number): Observable<ITask>  {

        return this.http.get<ITask>(`${this.resourceUrl}/${id}`);
      }
    deleteTask(id: number): Observable<{}> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
      }

      addTask(task: Task): Observable<ITask> {
        return this.http.post<ITask>(`${this.resourceUrl}`, task);
      }
    
      updateTask(task: Task): Observable<ITask> {
        return this.http.put<ITask>(`${this.resourceUrl}`, task);
      }
  
      getTaskList(req?: Pagination): Observable<HttpResponse<ITask[]>> {
        const options = createRequestOption(req);
        return this.http.get<ITask[]>(`${this.resourceUrl}/tasks`, { params: options, observe: 'response' });
      }
    
  
}

