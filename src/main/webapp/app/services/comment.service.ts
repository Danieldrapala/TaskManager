import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { Comment, IComment } from "app/model/comment.model";


@Injectable({ providedIn: 'root' })
export class CommentService{
    
    public resourceUrl = this.applicationConfigService.getEndpointFor('api/task/comment');
    
    
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
    }

    public addComment(comment: Comment){
        return this.http.post<IComment>(`${this.resourceUrl}`, comment);

    }

    public getComments(taskid: number){

        return this.http.get<IComment[]>(`${this.resourceUrl}/${taskid}`);

    }

}
