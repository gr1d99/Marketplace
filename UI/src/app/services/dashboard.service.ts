import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  constructor() {}

  public startLoader() {
    this.isLoading.next(true);
  }

  public stopLoader() {
    this.isLoading.next(false);
  }
}
