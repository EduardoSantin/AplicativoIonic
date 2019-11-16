import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "historicoPlantios"
})
@Component({
  selector: 'page-filtro-plantios',
  templateUrl: 'filtro-plantios.html',
})
export class FiltroPlantiosPage {

  uid;
  list;
  listArea;
  areaSelecionada = null;

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
  }

  populaSelectArea(){
    this.http.get("https://fir-login-26b40.firebaseio.com/areas/"+this.uid+".json")
    .map(res => res.json()).subscribe(data => {
      if(data != null && data != undefined){
        this.trataDadosArea(data);
      }
    });
  }
  
  trataDadosArea(dados){
    if(dados != null){
      this.listArea = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
    }
  }

  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
      this.populaSelectArea();
    })
  }


}
