import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@IonicPage({
  name:"novo-anotacao"
})
@Component({
  selector: 'page-novo-anotacao',
  templateUrl: 'novo-anotacao.html',
})
export class NovoAnotacaoPage {

  uid: string;
  titulo;
  anotacao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public storage: Storage) {
  }

  addAnotacao(titulo: string, anotacao: number){
    this.db.database.ref("anotacao").child(this.uid).push({
      titulo: titulo,
      anotacao: anotacao
    }).then(() => {
      this.titulo = "";
      this.anotacao = "";
      this.navCtrl.push("anotacao");
    })
  }
  
  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
  }
}
