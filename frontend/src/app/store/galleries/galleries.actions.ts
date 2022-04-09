import { createAction, props } from '@ngrx/store';
import { Gallery, GalleryData } from '../../models/gallery.model';

export const fetchGalleriesRequest = createAction(
  '[Galleries] Fetch Request',
  props<{id: string}>()
);
export const fetchGalleriesSuccess = createAction(
  '[Galleries] Fetch Success',
  props<{galleries: Gallery[]}>()
);
export const fetchGalleriesFailure = createAction(
  '[Galleries] Fetch Failure',
  props<{error: string}>()
);


export const createGalleryRequest = createAction(
  '[Galleries] Create Request',
  props<{galleryData: GalleryData}>()
);
export const createGallerySuccess = createAction(
  '[Galleries] Create Success'
);
export const createGalleryFailure = createAction(
  '[Galleries] Create Failure',
  props<{error: string}>()
);

export const deleteGalleryRequest = createAction(
  '[Galleries] Delete Request',
  props<{id: string, userId: string}>()
);
export const deleteGallerySuccess = createAction(
  '[Galleries] Delete Success'
);
export const deleteGalleryFailure = createAction(
  '[Galleries] Delete Failure',
  props<{error: string}>()
);
