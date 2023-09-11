import { NgModule } from '@angular/core';
import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    NgbModule,
    NgbCollapse
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
