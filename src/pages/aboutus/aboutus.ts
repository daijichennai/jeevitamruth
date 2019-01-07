import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommFuncProvider } from '../../providers/comm-func/comm-func';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  public domainName: string;
  public jsonItem: any;
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
    this.getAboutUsData();
  }


  getAboutUsData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/pageMaster.ashx?pageName=aboutUs";
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots',
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItem = result;
        loader.dismiss();
      })
    });

  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
