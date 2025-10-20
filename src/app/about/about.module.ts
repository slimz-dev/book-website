import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, CommonModule],
})
export class AboutModule {}
