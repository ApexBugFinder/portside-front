import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Degree } from '../Models/degree/degree';
import { Store, select } from '@ngrx/store';
import * as fromDegreeData from '../Models/degree/state';
@Component({
  selector: 'app-degree-shell',
  templateUrl: './degree-shell.component.html',
  styleUrls: ['./degree-shell.component.scss'],
})
export class DegreeShellComponent implements OnInit {
  myDegrees$: Observable<(Degree | undefined)[]>;

  constructor(private myDegreeStore: Store<fromDegreeData.DegreeDataState>) {
    this.myDegrees$ = this.myDegreeStore.pipe(
      select(fromDegreeData.selectAllDegrees)
    );
  }

  ngOnInit(): void {
    this.myDegrees$.subscribe({
      next: (value) => {
        if(value)
        console.log('HELLO', value);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
