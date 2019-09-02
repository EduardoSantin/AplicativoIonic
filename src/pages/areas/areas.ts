import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name:"areas"
})
@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html',
})
export class AreasPage {
  nomeFazenda;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get("nomeFazenda").then((resolve) => {
      this.nomeFazenda = resolve;
    })
  }

}
