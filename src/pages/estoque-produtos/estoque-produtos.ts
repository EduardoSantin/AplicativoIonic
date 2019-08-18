import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name:"estoque-produtos"
})
@Component({
  selector: 'page-estoque-produtos',
  templateUrl: 'estoque-produtos.html',
})
export class EstoqueProdutosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstoqueProdutosPage');
  }

}
