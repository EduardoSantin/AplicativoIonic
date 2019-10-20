import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';

@IonicPage({
  name: "editaArea"
})
@Component({
  selector: 'page-edita-area',
  templateUrl: 'edita-area.html',
})
export class EditaAreaPage {

  uid: string;
  nomeNovo;
  hectaresNovo;
  item;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
  }

  salvaEditaArea(nomeNovo: string, hectaresNovo: number){
    this.db.database.ref("/areas").child(this.uid)
    .child(this.item.key).set({
      hectares: hectaresNovo,
      nome: nomeNovo
    }).then(()=>{
      this.storage.remove("item");
      this.navCtrl.setRoot("areas");
    })
  }

  populaInput(){
    this.nomeNovo = this.item.nome;
    this.hectaresNovo = this.item.hectares;
  }

  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("item").then((resolve) => {
      this.item = resolve;
      this.populaInput();
    })
  }

}
