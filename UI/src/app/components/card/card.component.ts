import {Component, Input} from '@angular/core';
import {NzCardModule} from "ng-zorro-antd/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    NzCardModule
  ]
})
export class CardComponent {
  @Input("title") title: string = '';

}
