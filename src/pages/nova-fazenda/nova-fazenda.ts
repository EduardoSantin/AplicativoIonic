import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "nova-fazenda"
})
@Component({
  selector: 'page-nova-fazenda',
  templateUrl: 'nova-fazenda.html',
})
export class NovaFazendaPage {

  uid: string;
  nome;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public storage: Storage) {
  }

  addFazenda(nome: string){
    this.db.database.ref("fazenda").child(this.uid).push({
      nome: nome
    }).then(() => {
      this.nome = "";
      this.storage.set("nomeFazenda", nome);
      this.navCtrl.push("nova-area");
    })
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
  }
}
