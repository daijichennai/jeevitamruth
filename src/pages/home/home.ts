import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { CommFuncProvider } from '../../providers/comm-func/comm-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";
import { Subscription } from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public allEpisode: any;
  public infinteJson: any;
  public domainName: string;
  private intLastEpisodeID: number;
  connected: Subscription;
  disconnected: Subscription;
  public toastConnectedCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public myFunc: CommFuncProvider,
    private iab: InAppBrowser,
    public screenOrientation: ScreenOrientation,
    public socialSharing: SocialSharing,
    public network: Network,
    public toast: ToastController
  ) {
    this.domainName = myFunc.domainName;
    this.checkNetwork();

    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.toastConnectedCount = 0;
      this.toast.create({
        message: 'Oops, your internet connection seems to be off',
        position: 'bottom',
        duration: 3000
      }).present();
    });

    this.connected = this.network.onConnect().subscribe(data => {
      this.toastConnectedCount++;
      if (this.toastConnectedCount < 2) {
        this.toast.create({
          message: 'Your are Online Now',
          position: 'bottom',
          duration: 3000
        }).present();
        this.getAllEpisodeData();
      }
    }); 


  }

  checkNetwork() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline';
    if (connectionStatus == "online") {
      this.getAllEpisodeData();
    }
    else {
      this.toast.create({
        message: 'Oops, your internet connection seems to be off',
        position: 'bottom',
        duration: 3000
      }).present();
    }
  }

  lockLandscape() {
    //alert('Orientation locked landscape.');
    this.screenOrientation.lock('landscape');
  }
  
 
  lockPortrait() {
    //alert('Orientation locked portrait.');
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  openWebpage(url: string) {
    this.lockLandscape();
    const options: InAppBrowserOptions = {
      toolbar: 'no',
      location: 'no',
      zoom: 'no',
      fullscreen: 'yes',
    }

    // Opening a URL and returning an InAppBrowserObject
    //this.iab.create(url, '_system', options);
   const browser =   this.iab.create(url, '_blank', options);
    browser.on('exit').subscribe(event => {
      //alert('exit');
      this.lockPortrait()
    });
  } 

  ionViewDidLoad() {
    this.getAllEpisodeData();
  }

  getYouTubeVideoID(url) {
    if (url !== undefined) {
      var getURLShortCode = url.replace('https://www.youtube.com/embed/', '');
      return "https://img.youtube.com/vi/" + getURLShortCode + "/hqdefault.jpg";
    }
  }

  shareVideo(episodeTitle:string,youTubeUrl:string) {    
    this.socialSharing.share(episodeTitle, null, null, youTubeUrl).then(() => {
      console.log('success');
    }).catch(() => {
      console.log('error');
    });
  }


  getAllEpisodeData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/episodeMaster.ashx?episodeMode=scrollEpisode";
    let loader = this.loadingCtrl.create({
      content: 'Loading Please wait...',
      spinner: 'dots',
      cssClass: 'yellow'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        //console.log(result);
        this.allEpisode = result;
        let dataLength = this.allEpisode.length;
        this.intLastEpisodeID = this.allEpisode[dataLength - 1].episodeID;
        loader.dismiss();
      }, error => {
        loader.dismiss();
        //this.errorService.handleError(error);
      })
    });
  }

  doInfinite(e): Promise<any> {
    let infinteData: Observable<any>;
    return new Promise((resolve) => {
      setTimeout(() => {
        let infiniteURL = this.domainName + "handlers/episodeMaster.ashx?episodeMode=scrollEpisode&lastEpisodeID=" + this.intLastEpisodeID;
        infinteData = this.http.get(infiniteURL);
        infinteData.subscribe(response => {
          //console.log(response);
          this.infinteJson = response;
          const newData = this.infinteJson;

          this.intLastEpisodeID = this.infinteJson[newData.length - 1].episodeID;

          for (let i = 0; i < newData.length; i++) {
            this.allEpisode.push(newData[i]);
          }
          e.complete();
        })
        //console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }

}
