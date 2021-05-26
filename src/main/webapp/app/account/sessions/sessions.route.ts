import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/services/user-route-access.service';

import { SessionsComponent } from './sessions.component';

export const sessionsRoute: Route = {
  path: 'sessions',
  component: SessionsComponent,
  data: {
    pageTitle: 'Sessions',
  },
  canActivate: [UserRouteAccessService],
};
