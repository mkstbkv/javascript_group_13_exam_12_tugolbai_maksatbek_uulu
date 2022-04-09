import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createGalleryFailure,
  createGalleryRequest, createGallerySuccess, deleteGalleryFailure, deleteGalleryRequest, deleteGallerySuccess,
  fetchGalleriesFailure,
  fetchGalleriesRequest,
  fetchGalleriesSuccess, fetchUsersGalleriesFailure,
  fetchUsersGalleriesRequest, fetchUsersGalleriesSuccess
} from './galleries.actions';
import { GalleriesService } from '../../services/galleries.service';

@Injectable()
export class GalleriesEffects {
  fetchGalleries = createEffect(() => this.actions.pipe(
    ofType(fetchGalleriesRequest),
    mergeMap(() => this.galleriesService.getGalleries().pipe(
      map(galleries => fetchGalleriesSuccess({galleries})),
      catchError(() => of(fetchGalleriesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchUsersGalleries = createEffect(() => this.actions.pipe(
    ofType(fetchUsersGalleriesRequest),
    mergeMap(({id}) => this.galleriesService.getUsersGalleries(id).pipe(
      map(galleries => fetchUsersGalleriesSuccess({galleries})),
      catchError(() => of(fetchUsersGalleriesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createGallery = createEffect(() => this.actions.pipe(
    ofType(createGalleryRequest),
    mergeMap(({galleryData}) => this.galleriesService.createGallery(galleryData).pipe(
      map(() => createGallerySuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createGalleryFailure({error: 'Wrong data'})))
    ))
  ));

  deleteGallery = createEffect(() => this.actions.pipe(
    ofType(deleteGalleryRequest),
    mergeMap(({id, userId}) => this.galleriesService.deleteGallery(id, userId).pipe(
      map(() => deleteGallerySuccess()),
      tap(() => {
        this.store.dispatch(fetchUsersGalleriesRequest({id: userId}));
      }),
      catchError(() => of(deleteGalleryFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private galleriesService: GalleriesService,
    private router: Router
  ) {}
}
