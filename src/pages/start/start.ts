import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'start-page'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  uid: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage) {
  }

  sair(){
    this.storage.remove("user");
    console.log("usuario deslogado"); 
    this.navCtrl.setRoot("home-page");
  }

}
