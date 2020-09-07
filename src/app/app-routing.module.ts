import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ListingComponent } from './listing/listing.component';


const routes: Routes = [
  {
    path: 'home',
    component: BaseComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'listing',
    component: ListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
