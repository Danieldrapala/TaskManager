import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Pagination } from "app/core/request/request.model";
import { ITask, Task } from "app/model/task.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChartsService{
    
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/board');
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }
}
