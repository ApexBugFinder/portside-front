import { Directive, DoCheck, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appImgSrc]'
})
export class ImgSrcDirective implements OnInit, DoCheck{

  @Input() appImgSrc: string;
  @HostBinding('src') src: string;
  constructor(private el: ElementRef) {
    console.log('from Directive: ', this.appImgSrc);
    this.el.nativeElement.style.backgroundImage = this.appImgSrc;
   }
  ngDoCheck(): void {
    if (this.appImgSrc) {
      this.src = this.appImgSrc;
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 
}
