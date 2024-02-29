import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  navItems: { path: string, hasIcon: boolean, name: string, icon?: string }[] = [
    {
      path: '/dashboard',
      hasIcon: true,
      icon: 'dashboard',
      name: 'Dashboard'
    },
    {
      path: '/dashboard/products',
      hasIcon: true,
      icon: 'unordered-list',
      name: 'Products'
    },
  ]

  constructor(private router: Router) {
  }
}
