import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Input() myClass: string = '';
  faPlusCircle = faPlusCircle;
  @Output() addClassSignal: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }



  ngOnInit(): void {
  }

  createClass() {
    this.addClassSignal.emit('addEvent');
  }
}
