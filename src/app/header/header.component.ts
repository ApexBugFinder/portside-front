import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faKey } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  fakey = faKey;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
