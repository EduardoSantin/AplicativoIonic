import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams) {
  }

}
