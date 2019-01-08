import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommFuncProvider } from '../providers/comm-func/comm-func';
import { HttpClientModule } from '@angular/common/http'; 
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ScreenOrientation,
    SocialSharing,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommFuncProvider
  ]
})
export class AppModule {}
