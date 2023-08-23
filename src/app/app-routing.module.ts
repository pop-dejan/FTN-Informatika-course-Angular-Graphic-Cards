import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "cards", component: CardsComponent },
  { path: "", redirectTo:"home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
