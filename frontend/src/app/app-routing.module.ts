import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleriesComponent } from './pages/galleries/galleries.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPhotoComponent } from './pages/new-photo/new-photo.component';
import { UsersGalleryComponent } from './pages/users-gallery/users-gallery.component';

const routes: Routes = [
  {path: '', component: GalleriesComponent},
  {path: 'galleries/:id', component: UsersGalleryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-photo', component: NewPhotoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
