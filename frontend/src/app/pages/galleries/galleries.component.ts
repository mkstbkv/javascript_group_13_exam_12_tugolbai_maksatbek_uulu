import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Gallery } from '../../models/gallery.model';
import { fetchGalleriesRequest } from '../../store/galleries/galleries.actions';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.sass']
})
export class GalleriesComponent implements OnInit {
  galleries: Observable<Gallery[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.galleries = store.select(state => state.galleries.galleries);
    this.loading = store.select(state => state.galleries.fetchLoading);
    this.error = store.select(state => state.galleries.fetchError);
  }

  ngOnInit()  {
    this.store.dispatch(fetchGalleriesRequest({id: ''}));
  }
}
