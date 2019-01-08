import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string, mode: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public app: App,
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HOME', component: HomePage, icon: 'home', mode: '' },
      { title: 'WORD OF GOD', component: 'WordofgodPage', icon: 'add', mode: 'English' },
      { title: 'ದೆವಾಚೆಂ ಉತರ್', component: 'WordofgodPage', icon: 'add', mode: 'Kannada' },
      { title: 'ABOUT US', component: 'AboutusPage', icon: 'contact', mode: '' },
      { title: 'CONTACT US', component: 'ContactusPage', icon: 'call', mode: '' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) { //Can we go back?
          nav.pop();
        } else {
          this.exitFunction();
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {
      "mode": page.mode
    });
  }

  exitFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit Jeevitamruth ?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  } 

}
