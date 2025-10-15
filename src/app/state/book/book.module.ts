import { NgModule } from '@angular/core';
import { bookReducer } from './book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './book.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects]),
  ],
})
export class BookModule {}
