import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Task } from 'app/model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskListService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/task/tasks');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}



}
