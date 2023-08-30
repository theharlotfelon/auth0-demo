import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auth0-demo';
  isCollapsed = true;

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {
  }

  async ngOnInit() {
    this.isCollapsed = true;
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin
      }
    });
  }
}
