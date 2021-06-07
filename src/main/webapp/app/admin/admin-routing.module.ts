import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardManagmentComponent } from '../user-view/board-managment/board-managment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'Users',
        },
      },
      {
        path: 'docs',
        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
      },
      {
        path: 'board-managment',
        loadChildren: () => import('../user-view/board-managment/board-managment.module').then(m => m.BoardManagementModule),
        data: {
          pageTitle: 'Board',
        },
      }
    ]),
  ],
})
export class AdminRoutingModule {}
