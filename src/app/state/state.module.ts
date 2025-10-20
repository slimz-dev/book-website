import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './app.effects';

@NgModule({
  imports: [StoreModule.forRoot(reducers), EffectsModule.forRoot(effects)],
})
export class StateModule {}
