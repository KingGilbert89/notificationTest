import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotifierComponent } from './notifier/notifier.component';

const routes: Routes = [{ path: 'notifier', component: NotifierComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
