import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';

// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { SignUpComponent } from './sign-up/sign-up.component';


import {HttpConfigInterceptor} from './interceptors/http-config.interceptor';
import { GeneralService } from './services/general.service';
import { SharedService } from './services/shared.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    ListingComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule
  ],
  providers: [
    GeneralService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
