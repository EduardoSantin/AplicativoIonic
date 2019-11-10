import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';

@IonicPage({
  name:"editaAnotacao"
})
@Component({
  selector: 'page-edita-anotacao',
  templateUrl: 'edita-anotacao.html',
})
export class EditaAnotacaoPage {

  uid: string;
  tituloNovo;
  anotacaoNovo;
  item;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
  }

  salvaEditaAnotacao(tituloNovo: string, anotacaoNovo: number){
    this.db.database.ref("/anotacao").child(this.uid).child(this.item.key).set({
      titulo: tituloNovo,
      anotacao: anotacaoNovo
    }).then(()=>{
      this.storage.remove("item");
      this.navCtrl.setRoot("anotacao");
    })
  }

  populaInput(){
    console.log(this.item.key)
    this.tituloNovo = this.item.titulo;
    this.anotacaoNovo = this.item.anotacao;
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
