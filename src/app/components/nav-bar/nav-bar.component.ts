import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  title = 'auth0-demo'

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
