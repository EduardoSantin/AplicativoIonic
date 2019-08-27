import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: "previsao"
})
@Component({
  selector: 'page-previsao',
  templateUrl: 'previsao.html',
})
export class PrevisaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
