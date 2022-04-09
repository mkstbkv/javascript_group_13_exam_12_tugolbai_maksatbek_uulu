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
import { FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../environments/environment';

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
    FileInputComponent
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
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
