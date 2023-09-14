import { NgModule } from '@angular/core';
import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapse
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
