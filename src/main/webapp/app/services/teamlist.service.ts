import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { Account } from 'app/core/auth/account.model';
import { IUserForUser } from 'app/model/user.model';

@Injectable({ providedIn: 'root' })
export class TeamListService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/admin');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  query(req?: Pagination): Observable<HttpResponse<IUserForUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUserForUser[]>(this.resourceUrl+'/users', { params: options, observe: 'response' });
  }
  getAllUsers(): Observable<Account[]>  {

    return this.http.get<Account[]>(`${this.resourceUrl}`+'/publicusers');
  }
  getUser(id:string|undefined): Observable<Account>  {

    return this.http.get<Account>(`api`+'/publicuser/${id}');
  }
}
