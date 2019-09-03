import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "nova-area"
})
@Component({
  selector: 'page-nova-area',
  templateUrl: 'nova-area.html',
})
export class NovaAreaPage {

  uid: string;
  nomeFazenda;
  nome;
  hectares;
  list;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public storage: Storage) {
  }

  addArea(nome: string, hectares: number){
    this.db.database.ref("areas").child(this.uid).child("Fazenda: "+this.nomeFazenda).push({
      nome: nome,
      hectares: hectares
    }).then(() => {
      this.nome = "";
      this.hectares = "";
      this.navCtrl.push("areas");
    })
  }
  
  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get('nomeFazenda').then((resolve) => {
      this.nomeFazenda = resolve;
    })
  }
  
}
