import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { ViewFlightComponent } from './view-flight/view-flight.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { DeleteflightComponent } from './deleteflight/deleteflight.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchFlightComponent,
    AboutusComponent,
    AddFlightComponent,
    RegisterComponent,
    ConfirmEqualValidatorDirective,
    ViewFlightComponent,
    UserHomeComponent,
    AdminHomeComponent,
    ClassDetailsComponent,
    ForgotpasswordComponent,
    PassengerDetailsComponent,
    DeleteflightComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
