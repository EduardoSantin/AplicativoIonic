import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage({
  name:"anotacao"
})
@Component({
  selector: 'page-anotacao',
  templateUrl: 'anotacao.html',
})
export class AnotacaoPage {

  uid: string;
  list;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
  }

  excluirAnotacao(key){
    this.db.database.ref("/anotacao").child(this.uid).child(key).remove()
    .then(() => {
      this.getList();
    })
  }

  editarAnotacao(item){
    this.storage.set("item", item);
    this.navCtrl.push("editaAnotacao");
  }

  getList(){
    this.http.get('https://fir-login-26b40.firebaseio.com/anotacao/'+this.uid+'.json')
    .map(res => res.json())
    .subscribe(data => {
        this.trataDados(data);
    })
  }

  trataDados(dados){
    if(dados!= null){
      this.list = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
    }
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }

}
