import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './component/navbar/navbar.component';
import { StateModule } from './state/state.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from './core/auth.interceptor';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store';
import { StorageService } from './services/storage.service';
import userReducerAction from './state/user/user.action';

const initApp = (store: Store, storage: StorageService) => {
  return () => {
    if (storage.get('accessToken')) {
      store.dispatch(userReducerAction.fetchingUser());
    }
    return Promise.resolve();
  };
};

@NgModule({
  declarations: [AppComponent, NavBarComponent],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    OverlayPanelModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    StateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Store, StorageService],
      multi: true,
    },
  ],
})
export class AppModule {}
