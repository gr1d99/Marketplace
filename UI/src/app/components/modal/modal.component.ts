import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NzModalModule} from "ng-zorro-antd/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    NzModalModule
  ],
  standalone: true
})
export class ModalComponent implements OnInit {
  isOpen: boolean = false;
  @Input() isVisible: Subject<boolean> = new Subject();
  @Input() handleCancel: () => void = null!
  @Input() handleOk: () => void = null!
  @Input() isOkLoading: boolean = false;
  @Input() title: string = '';
  @Input() showFooter: boolean = true;
  includeFooter: null | string = ''

  ngOnInit(): void {
    this.isVisible.subscribe(value => {
      this.isOpen = value;
    })

    if (!this.showFooter) {
      this.includeFooter = null
    }
  }

  cancel() {
    this.handleCancel();
  }

  ok() {
    this.handleOk();
  }
}
