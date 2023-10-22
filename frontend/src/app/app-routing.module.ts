import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-tasks',
    pathMatch: 'full'
  },
  {
    path: 'add-tasks',
    loadChildren: () => import('./add-task/add-task.module').then( m => m.AddTaksPageModule)
  },
  {
    path: 'list-tasks',
    loadChildren: () => import('./list-tasks/list-tasks.module').then( m => m.ListTasksPageModule)
  },  {
    path: 'update-task',
    loadChildren: () => import('./update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
