import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {APP_ROUTES} from "../shared/constanst";
import {Helpers} from "../helpers";

interface NavItem { path: string, hasIcon: boolean, name: string, icon?: string }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  navItems: NavItem[] = [
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

  secondaryNavItems: NavItem = {
    path: Helpers.generateRouteFromSegments("/", APP_ROUTES.auth, "/", APP_ROUTES.logout),
    hasIcon: true,
    icon: 'logout',
    name: 'Logout'
  }

  constructor(private router: Router) {
  }
}
