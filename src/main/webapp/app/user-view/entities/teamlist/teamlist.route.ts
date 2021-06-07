import { Routes } from '@angular/router';
import { TeamListComponent } from './teamlist.component';



export const teamListRoute: Routes = [
  {
    path: '',
    component: TeamListComponent,
    data: {
      defaultSort: 'id,asc',
    },
  }
];
