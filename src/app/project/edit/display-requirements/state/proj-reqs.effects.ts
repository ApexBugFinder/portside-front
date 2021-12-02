import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, tap, switchMap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";


@Injectable()
export class ProjReqEffects {
    
}