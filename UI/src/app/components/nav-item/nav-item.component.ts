import { Component, Input } from "@angular/core";
import { NavItem } from "../../interfaces/nav-item";

@Component({
  selector: "app-nav-item",
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.scss"],
})
export class NavItemComponent {
  @Input() item: NavItem | undefined;
}
