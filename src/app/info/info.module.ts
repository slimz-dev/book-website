import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InfoRoutingModule } from './info-routing.module';
import { CommonModule } from '@angular/common';
// import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    FormsModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    InfoRoutingModule,
    CommonModule,
  ],
  exports: [],
})
export class InfoModule {}
