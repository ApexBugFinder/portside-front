import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider'
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from "@angular/material/menu";
@NgModule({

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
     MatListModule,
    MatChipsModule,
    MatSliderModule,
    MatDividerModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
