import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, BookCardComponent, BookModalComponent],
  imports: [ReactiveFormsModule, CommonModule],
})
export class HomeModule {}
