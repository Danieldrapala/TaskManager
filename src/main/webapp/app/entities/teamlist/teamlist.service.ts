import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { IUserForUser } from '../../model/user.model';

@Injectable({ providedIn: 'root' })
export class TeamListService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/admin/users');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  query(req?: Pagination): Observable<HttpResponse<IUserForUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUserForUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
