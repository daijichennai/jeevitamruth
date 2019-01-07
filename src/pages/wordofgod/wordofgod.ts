import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommFuncProvider } from '../../providers/comm-func/comm-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-wordofgod',
  templateUrl: 'wordofgod.html',
})
export class WordofgodPage {

  public domainName: string;
  public jsonItem: any;
  public mode: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public myFunc: CommFuncProvider

  ) {

    this.domainName = myFunc.domainName;
    this.mode = navParams.get("mode");
    //alert(this.mode);
  }
  ionViewDidLoad() {
    this.getDataByMode(this.mode);
  }

  getDataByMode(langMode) {
    let data: Observable<any>;
    let url = this.domainName + "handlers/wordOfGodMaster.ashx?wordofGodMode=selectList&langMode=" + langMode;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots',
      cssClass: 'yellow'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        this.jsonItem = result;
        loader.dismiss();
      })
    });

  }

  displayWordOfGodByID(wordOfGodID) {
    this.navCtrl.push('WordofgodDisplayPage', {
      "wordOfGodID": wordOfGodID
    })
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
