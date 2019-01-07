import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { CommFuncProvider } from '../../providers/comm-func/comm-func';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  
  authForm: FormGroup;
  public domainName: string;
  public jsonItem: any;

  public contactEmail: string;
  public contactName: string;
  public contactMessage: string;
  public contactMobile: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public myFunc: CommFuncProvider,
    public fb: FormBuilder,
    public alertCtrl: AlertController,
  ) {

    this.domainName = myFunc.domainName;
    this.authForm = this.fb.group({
      'ecUserName': [null, Validators.compose([Validators.required])],
      'ecUserMobile': [null, Validators.compose([Validators.required])],
      'ecUserEmail': ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      'ecComments': [null, Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {

  }

  insertComments() {
    //alert("comments");
    let insCommentURL = ""

    insCommentURL = this.domainName + "handlers/contactSendMail.ashx?contactName=" + this.contactName + "&contactEmail=" + this.contactEmail + "&contactMobile=" + this.contactMobile + "&contactMessage=" + this.contactMessage;

    this.http.post(insCommentURL, "").subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
      });

    this.presentAlert()
    this.navCtrl.setRoot(HomePage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Thank you for contacting us.We will contact you shortly.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }


}
