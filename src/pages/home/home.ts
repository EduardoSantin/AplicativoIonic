import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams} from 'ionic-angular';

@IonicPage({
  name: 'home-page'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

}
