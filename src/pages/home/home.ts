import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommFuncProvider } from '../../providers/comm-func/comm-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public allEpisode: any;
  public infinteJson: any;
  public domainName: string;
  private intLastEpisodeID: number
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public myFunc: CommFuncProvider
  ) {
    this.domainName = myFunc.domainName;

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

  getAllEpisodeData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/episodeMaster.ashx?episodeMode=scrollEpisode";
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
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
