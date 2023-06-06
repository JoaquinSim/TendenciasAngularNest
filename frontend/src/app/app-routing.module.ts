import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeComponent } from './pages/bike/bike.component';
import { BikelistComponent } from './pages/bikelist/bikelist.component';

const routes: Routes = [
  {path:'', component:BikeComponent},
  {path:'bikelist', component:BikelistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
