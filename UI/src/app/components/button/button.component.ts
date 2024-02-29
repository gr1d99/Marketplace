import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [
    NzButtonModule,
    NzIconModule,
    NgIf
  ],
  standalone: true
})
export class ButtonComponent implements OnInit {
  @Input() variant: 'primary' | "default" | "text" | "link" = 'primary'
  @Input() type: 'button' | "submit" = 'button'
  @Input() label = ''
  @Input() size: 'default' | 'small' | 'large' = 'default'
  @Input() icon = ''
  @Input() loading = false
  @Input() disabled = false
  @Output() onClick = new EventEmitter<any>()
  @Input() fullWidth = false;

  onButtonClick() {
    this.onClick.emit()
  }

  ngOnInit(): void {
  }
}
