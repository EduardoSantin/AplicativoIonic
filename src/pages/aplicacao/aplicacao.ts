import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name:"nova-aplicacao"
})
@Component({
  selector: 'page-aplicacao',
  templateUrl: 'aplicacao.html',
})
export class AplicacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AplicacaoPage');
  }

}
