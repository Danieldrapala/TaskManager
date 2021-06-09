import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class StatisitcService {

    public resourceUrl = this.applicationConfigService.getEndpointFor('api/stats');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  
  public getTasksAssignedTo(id: number) {
    return this.http.get<number[]>(`${this.resourceUrl}/assignedtasks/${id}`);
  }


  public getTasksCompletedCountByUser(id: number) {
        return this.http.get<number[]>(`${this.resourceUrl}/completedtasks/${id}`);
    }

  public  getTaskCount() {
      return this.http.get<number[]>(`${this.resourceUrl}/generalcount`);
    }
    
  public   getAssigmentForTask(id: number) {
      return this.http.get<number[]>(`${this.resourceUrl}/assignmentCount/${id}`);
    }

  public  getDragAndDropCount(id: number) {
      return this.http.get<number[]>(`${this.resourceUrl}/dragndropevent/${id}`);
    }
   
  }
