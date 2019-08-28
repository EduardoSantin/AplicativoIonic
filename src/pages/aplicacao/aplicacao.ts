import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';



@IonicPage({
  name:"nova-aplicacao"
})
@Component({
  selector: 'page-aplicacao',
  templateUrl: 'aplicacao.html',
})
export class AplicacaoPage {

  uid: string;
  insumos;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage,
    public db: AngularFireDatabase) {
  }

  getList(){
    this.http.get('https://fir-login-26b40.firebaseio.com/estoques/'+this.uid+'.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data != null && data != undefined){
        this.trataDados(data);
      }
    })
  }

  trataDados(dados){
    if(dados!= null){
      this.insumos = Object.keys(dados).map(i => dados[i]);
      console.log(this.insumos);
    }
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    });
  }


}
