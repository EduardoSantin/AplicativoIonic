import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name:"produtividade"
})
@Component({
  selector: 'page-produtividade',
  templateUrl: 'produtividade.html',
})
export class ProdutividadePage {

  uid;
  itemColher;
  list;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }

  getList(){
    this.http.get('https://fir-login-26b40.firebaseio.com/plantio/'+this.uid+'.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data != null || data != undefined){
        this.trataDados(data);
      }
    })
  }

  trataDados(dados){
    if(dados != null){
      this.list = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
    }
    console.log(this.list);
  }


  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("itemColher").then((resolve) => {
      this.itemColher = resolve;
      this.getList();
    })
  }

}
