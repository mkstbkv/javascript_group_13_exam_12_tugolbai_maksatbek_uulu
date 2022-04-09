import { createReducer, on } from '@ngrx/store';
import { GalleriesState } from '../types';
import {
  createGalleryFailure,
  createGalleryRequest,
  createGallerySuccess,
  deleteGalleryFailure,
  deleteGalleryRequest,
  deleteGallerySuccess,
  fetchGalleriesFailure,
  fetchGalleriesRequest,
  fetchGalleriesSuccess
} from './galleries.actions';

const initialState: GalleriesState = {
  galleries: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const galleriesReducer = createReducer(
  initialState,
  on(fetchGalleriesRequest, state => ({...state, fetchLoading: true})),
  on(fetchGalleriesSuccess, (state, {galleries}) => ({
    ...state,
    fetchLoading: false,
    galleries
  })),
  on(fetchGalleriesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createGalleryRequest, state => ({...state, createLoading: true})),
  on(createGallerySuccess, state => ({...state, createLoading: false})),
  on(createGalleryFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),


  on(deleteGalleryRequest, state => ({...state, deleteLoading: true})),
  on(deleteGallerySuccess, state => ({
    ...state,
    fetchLoading: false,
  })),
  on(deleteGalleryFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),
);
