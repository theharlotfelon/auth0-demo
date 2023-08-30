import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { setSection } from './_helpers/lp_methods'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auth0-demo';
  isCollapsed = true;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService, @Inject(DOCUMENT)
    private doc: Document
  ) {}

  async ngOnInit() {
    this.isCollapsed = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.methodToCall();
      }
    });
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

  methodToCall() {
    console.log('New page loaded');

    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
        console.log(this.isAuthenticated);

        if (this.isAuthenticated) {
          setSection(["angular", "auth"]);
        }
        else {
          setSection(["angular", "unauth"]);

        }
      }
    });
  }
}
