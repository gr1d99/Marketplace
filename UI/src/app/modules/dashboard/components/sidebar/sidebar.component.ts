import { Component } from '@angular/core';
import {Helpers} from "../../../../helpers";
import {APP_ROUTES} from "../../../../shared/constanst";
import {NavItem} from "../../../../interfaces/nav-item";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
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
    {
      path: Helpers.generateRouteFromSegments('/', APP_ROUTES.dashboardCategories),
      hasIcon: true,
      icon: 'group',
      name: 'Categories'
    },
    {
      path: Helpers.generateRouteFromSegments('/', APP_ROUTES.dashboardVendors),
      hasIcon: true,
      icon: 'shop',
      name: 'Vendors'
    },
    // {
    //   hasIcon: true,
    //   icon: 'group',
    //   name: 'Categories',
    //   hasChildren: true,
    //   children: [{
    //     path: '/dashboard/categories/create',
    //     hasIcon: false,
    //     name: 'Create',
    //   }]
    // }
  ]

  secondaryNavItems: NavItem = {
    path: Helpers.generateRouteFromSegments("/", APP_ROUTES.auth, "/", APP_ROUTES.logout),
    hasIcon: true,
    icon: 'logout',
    name: 'Logout'
  }

}
