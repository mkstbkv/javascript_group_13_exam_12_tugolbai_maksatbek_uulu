import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Gallery } from '../../models/gallery.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { deleteGalleryRequest, fetchGalleriesRequest } from '../../store/galleries/galleries.actions';
import { ModalComponent } from '../../ui/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-gallery',
  templateUrl: './users-gallery.component.html',
  styleUrls: ['./users-gallery.component.sass']
})
export class UsersGalleryComponent implements OnInit, OnDestroy {
  galleries: Observable<Gallery[]>
  galleriesSub!: Subscription;
  loading: Observable<boolean>
  error: Observable<null | string>
  routId!: string;

  authorName = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public dialog: MatDialog) {
    this.galleries = store.select(state => state.galleries.galleries);
    this.loading = store.select(state => state.galleries.fetchLoading);
    this.error = store.select(state => state.galleries.fetchError);
  }

  openDialog(dest: string) {
    const dialogRef = this.dialog.open(ModalComponent,{
      data: {image: dest},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.routId = this.route.snapshot.params['id']
    this.store.dispatch(fetchGalleriesRequest({id : this.routId}));
    this.galleriesSub = this.galleries.subscribe(galleries => {
      galleries.forEach(g => {
        this.authorName = g.user.displayName
      })
    })
  }

  delete(id: string, userId: string) {
    this.store.dispatch(deleteGalleryRequest({id, userId}))
  }

  ngOnDestroy() {
    this.galleriesSub.unsubscribe()
  }
}
