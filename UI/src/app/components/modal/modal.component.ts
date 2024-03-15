import {Component, EventEmitter, Input} from '@angular/core';
import {NzModalModule} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    NzModalModule
  ],
  standalone: true
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() handleCancel: () => void = null!
  @Input() handleOk: () => void = null!
  @Input() isOkLoading: boolean = false;
}
