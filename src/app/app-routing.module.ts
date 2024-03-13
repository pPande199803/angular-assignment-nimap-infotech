import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'view-details', component:ViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
