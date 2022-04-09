import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gallery, GalleryData } from '../models/gallery.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  constructor(private http: HttpClient) { }

  getGalleries() {
    return this.http.get<Gallery[]>(environment.apiUrl + '/galleries').pipe(
      map(response => {
        return response.map(galleryData => {
          return new Gallery(
            galleryData._id,
            galleryData.user,
            galleryData.title,
            galleryData.image,
          );
        });
      })
    );
  }

  getUsersGalleries(id: string) {
    return this.http.get<Gallery[]>(environment.apiUrl + '/galleries/' + id).pipe(
      map(response => {
        return response.map(galleryData => {
          return new Gallery(
            galleryData._id,
            galleryData.user,
            galleryData.title,
            galleryData.image,
          );
        });
      })
    );
  }

  createGallery(galleryData: GalleryData) {
    const formData = new FormData();

    Object.keys(galleryData).forEach(key => {
      if (galleryData[key] !== null) {
        formData.append(key, galleryData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/galleries', formData);
  }

  deleteGallery(id: string, userId: string) {
    return this.http.delete(environment.apiUrl + '/galleries/' + id, {body: {user: userId}})
  }
}
