import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {setIdentity, setSection} from './_helpers/lp_methods'
import {firstValueFrom } from "rxjs";

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
  jwt:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService, @Inject(DOCUMENT)
    private doc: Document,
  ) {

   /* (window as any).lpMethod = {
      async lpGetAuthenticationToken () {
        console.log("LP asked for id_token or auth code in Code Flow");
        try {
          // Do your magic…
          const id_token = await firstValueFrom(auth.idTokenClaims$);
          // On Success
          console.log(id_token.__raw)
          return id_token.__raw;
        } catch (error) {
          console.error('Error fetching data:', error);
          return error;
        }
      },
    };*/

    (window as any).lpMethod = {
       lpGetAuthenticationToken: async (cb) => {
        console.log("LP asked for id_token or auth code in Code Flow");
          return cb({
            redirect_uri: window.location.origin + '/home', ssoKey: await firstValueFrom(auth.idTokenClaims$).then(data => {
              setIdentity(data['iss'], "loa1", data['sub'])
              console.log(data);
              return data.__raw
            })
          })
        }
      };

  }


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
          setSection(["angular", "auth"])
          setIdentity('https://dev-qe7bluong1kg7kp8.us.auth0.com/', "loa1", 'auth0|64eec39749e311035ad7face')

          /*async function jwtClaim(obs) {
            const data = await firstValueFrom((obs))
            setIdentity(data['iss'], "loa1", data['sub'])
            setSection(["angular", "auth"])
          }

          jwtClaim(this.auth.idTokenClaims$);*/

        }
        else {
          setSection(["angular", "unauth"]);
        }
      }
    });
  }
}
