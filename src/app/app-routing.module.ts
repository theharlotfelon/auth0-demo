import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {CallbackComponent} from "./_helpers/callback.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
