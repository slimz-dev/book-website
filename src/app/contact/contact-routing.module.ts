import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';

const route: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
