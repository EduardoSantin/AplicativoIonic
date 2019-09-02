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

  nomeFazenda;
  uid: string;
  nome;
  list;


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
      this.getList();
    })
  }

  getList(){
    let listDb = this.db.database.ref("fazenda").child(this.uid);
    listDb.on('value', (snapshot) => {
      const itens = snapshot.val();
      if(itens){
        this.list = Object.keys(itens).map(i => itens[i]);
      }
    })
  }
  
  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
    this.storage.get('nomeFazenda').then((resolve) => {
      this.nomeFazenda = resolve;
    })
  }
  
}
