import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { GalleryData } from '../../models/gallery.model';
import { createGalleryRequest } from '../../store/galleries/galleries.actions';

@Component({
  selector: 'app-new-photo',
  templateUrl: './new-photo.component.html',
  styleUrls: ['./new-photo.component.sass']
})
export class NewPhotoComponent {
  @ViewChild('f') form!: NgForm;

  constructor(
    private store: Store<AppState>
  ) { }

  onSubmit() {
    const galleryData: GalleryData = this.form.value
    this.store.dispatch(createGalleryRequest({galleryData}));
  }
}
