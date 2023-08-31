import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {setIdentity, setSection} from './_helpers/lp_methods'
import {firstValueFrom, lastValueFrom, of, switchMap, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auth0-demo';
  isCollapsed = true;
  isAuthenticated = false;
  data:any;

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

    //this.auth.idTokenClaims$.pipe(take(1)).subscribe(value => {return value.asObservable()});

    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
        console.log("authenticated: " + this.isAuthenticated);

        if (this.isAuthenticated) {
          // this.auth.idTokenClaims$.subscribe({
          //   next: (data) => {
          //     setIdentity(data.iss, "ac0", data.sub)
          //     setSection(["angular", "auth"]);
          //   }
          // })

          async function jwtClaim(obs) {
            const data = await firstValueFrom((obs))
            console.log(data)
            setIdentity(data['iss'], "acr0", data['sub'])
            setSection(["angular", "auth"])
          }

          jwtClaim(this.auth.idTokenClaims$);

        }
        else {
          setSection(["angular", "unauth"]);
        }
      }
    });
  }
}
