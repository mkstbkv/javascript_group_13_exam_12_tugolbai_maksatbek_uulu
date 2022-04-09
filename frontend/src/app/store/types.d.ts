import { LoginError, RegisterError, User } from '../models/user.model';
import { Gallery } from '../models/gallery.model';

export type GalleriesState = {
  galleries: Gallery[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  galleries: GalleriesState,
  users: UsersState,
}


