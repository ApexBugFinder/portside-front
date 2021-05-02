import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-getter',
  templateUrl: './image-getter.component.html',
  styleUrls: ['./image-getter.component.scss']
})
export class ImageGetterComponent implements OnInit {

  @Input() Title: string;
  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(file: FileList) {

    
  }

}
