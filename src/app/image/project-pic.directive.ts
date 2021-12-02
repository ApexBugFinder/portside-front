import { Directive, DoCheck, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromShared from '../shared/state';

@Directive({
  selector: '[projectPic]'
})
export class ProjectPicDirective implements DoCheck{

  @Input() projectPic: string;
  defaultPic =  '';
//   'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/defaults%2Fuser%2FIcon%20ionic-md-person.svg?alt=media&token=de900d75-57db-4d92-b0db-3ccd1bdf6c04';
  defaultPic$: Observable<string>;
  @HostBinding('src') src: string;
  constructor(
      private el: ElementRef,
        private renderer: Renderer2,
        private sharedStore: Store<fromShared.SharedState>) {

    // console.log('from Directive: ', this.projectPic);
    this.el.nativeElement.style.backgroundImage = this.projectPic;
    this.sharedStore.pipe(select(fromShared.getDefaultProjectPic))
        .subscribe(value => this.defaultPic = value);
   }
  ngDoCheck(): void {
    if (this.projectPic) {
    //   this.src = this.projectPic;
      this.setSource(this.projectPic);
      // console.log('img src directive url: \n', this.src);
      // console.log('default pic is: \n', this.defaultPic);
      this.el.nativeElement.style.visibility = 'visible';
      if(this.src == this.defaultPic) {

        // console.log('src is equalto defaultPic');

      }

    } else {

    this.el.nativeElement.style.display = 'none';

    }
  }

  @HostListener('error') onError() {

    // IF error from src not found happens then this
    // changes the source pic to the default pic
      console.log('start error logic');
     this.el.nativeElement.style.visibility = 'hidden';
     if (this.src != this.defaultPic){
         console.log('changing pic to default');
        this.projectPic = this.defaultPic;
     }

     console.log(this.src);
     //   this.el.nativeElement.style.border = 'none';
    //   this.el.nativeElement.style.boxShadow = 'none';
    //   this.el.nativeElement.style.display = 'none';
  }
  setSource(userUrl:string) {
      this.src = userUrl;
  }

}
