import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Gallery } from '../../models/gallery.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { fetchGalleriesRequest } from '../../store/galleries/galleries.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-gallery',
  templateUrl: './users-gallery.component.html',
  styleUrls: ['./users-gallery.component.sass']
})
export class UsersGalleryComponent implements OnInit {
  user: Observable<null | User>;
  userOne!: User;
  userSub!: Subscription;
  galleries: Observable<Gallery[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.galleries = store.select(state => state.galleries.galleries);
    this.loading = store.select(state => state.galleries.fetchLoading);
    this.error = store.select(state => state.galleries.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.store.dispatch(fetchGalleriesRequest({id : this.route.snapshot.params['id']}));
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.userOne = user;
      }
    })
  }
}
