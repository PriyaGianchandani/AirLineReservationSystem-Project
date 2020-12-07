import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFlightComponent } from './search-flight/search-flight.component'
import {LoginComponent } from './login/login.component'
import {AboutusComponent} from './aboutus/aboutus.component'
import {AddFlightComponent} from './add-flight/add-flight.component'
import {RegisterComponent} from './register/register.component'
import { ViewFlightComponent } from './view-flight/view-flight.component'

import { LoginService } from './login.service';
import { from } from 'rxjs';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { DeleteflightComponent } from './deleteflight/deleteflight.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:"search-flight",component:SearchFlightComponent},
  {path:'home',component:UserHomeComponent},
  {path:"Login",component:LoginComponent},
  {path:"Aboutus",component:AboutusComponent},
  {path:"add-flight",component:AddFlightComponent},
  //{path:"register",component:RegisterComponent},
  {path: 'register',component: RegisterComponent,data: {title: 'Add User Page'}},
  {path:'ViewFlight',component:ViewFlightComponent},
  {path:'admin-home',component:AdminHomeComponent},
  {path:'class-details',component:ClassDetailsComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'passengerdetails',component:PassengerDetailsComponent},
  {path:'deleteflight',component:DeleteflightComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
