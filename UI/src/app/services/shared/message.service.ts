import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private message: NzMessageService) { }

  successMessage(value: string) {
    this.message.create("success", value)
  }

  errorMessage(value: string) {
    this.message.create("error", value)
  }
}
