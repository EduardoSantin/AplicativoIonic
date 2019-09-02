import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "listFazenda"
})
@Component({
  selector: 'page-list-fazenda',
  templateUrl: 'list-fazenda.html',
})

export class ListFazendaPage {

  uid: string;
  list;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage) {
  }

  areasDaFazenda(nome){
    this.storage.set('nomeFazenda', nome);
    this.navCtrl.push("areas");
  }

  getList(){
    this.http.get("https://fir-login-26b40.firebaseio.com/fazenda/"+this.uid+'.json')
    .map(res => res.json()).subscribe(data => {
      if(data != null && data != undefined){
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
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }

}
