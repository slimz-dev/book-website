import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBooks } from '../state/book/book.selectors';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  books$ = this.store.select(selectBooks);
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
