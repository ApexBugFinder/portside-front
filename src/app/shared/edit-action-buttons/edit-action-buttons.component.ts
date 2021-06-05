import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-edit-action-buttons',
  templateUrl: './edit-action-buttons.component.html',
  styleUrls: ['./edit-action-buttons.component.scss'],
})
export class EditActionButtonsComponent implements OnInit {
  @Output() save: EventEmitter<string> = new EventEmitter<string>();
  @Output() reset: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  deleteFromDB() {
    const message = 'Delete Current';
    this.delete.emit(message);
  }

  resetChanges() {
    const message = 'Reset Current';
    this.reset.emit(message);
  }

  saveToDB() {
    const message = 'Save Current';
    this.save.emit(message);
  }
}
