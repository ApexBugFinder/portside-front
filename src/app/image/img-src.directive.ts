import { Directive, DoCheck, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgSrc]'
})
export class ImgSrcDirective implements DoCheck{
  
  @Input() appImgSrc: string;
  @HostBinding('src') src: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('from Directive: ', this.appImgSrc);
    this.el.nativeElement.style.backgroundImage = this.appImgSrc;
    ;
   }
  ngDoCheck(): void {
    if (this.appImgSrc) {
      this.src = this.appImgSrc;
      console.log('img src directive url: ', this.src);
      this.el.nativeElement.style.display = 'block';
      this.renderer.addClass(this.el.nativeElement, 'showMe' );
    } else {
      this.el.nativeElement.style.display = 'none'
    }
  }



}
