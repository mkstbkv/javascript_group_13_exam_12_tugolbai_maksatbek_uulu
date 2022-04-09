import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { GalleriesComponent } from './pages/galleries/galleries.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ImagePipe } from './pipes/image.pipe';
import { UserTypeDirective } from './directives/user-type.directive';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptor } from './auth.interceptor';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { AppStoreModule } from './store/app-store.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { MatInputModule } from '@angular/material/input';
import { NewPhotoComponent } from './pages/new-photo/new-photo.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersGalleryComponent } from './pages/users-gallery/users-gallery.component';
import { UserCheckDirective } from './directives/userCheck.directive';
import { ModalComponent } from './ui/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile'
      })
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CenteredCardComponent,
    GalleriesComponent,
    RegisterComponent,
    LoginComponent,
    ImagePipe,
    UserTypeDirective,
    UserCheckDirective,
    FileInputComponent,
    ValidateIdenticalDirective,
    NewPhotoComponent,
    UsersGalleryComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    AppStoreModule,
    MatSnackBarModule,
    SocialLoginModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
