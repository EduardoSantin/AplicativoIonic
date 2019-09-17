import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name: "areasPlantadas"
})
@Component({
  selector: 'page-areas-plantadas',
  templateUrl: 'areas-plantadas.html',
})
export class AreasPlantadasPage {

  uid;
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
      })
    }
  }

  colher(key){
    this.storage.set("keyColher", key);
    this.navCtrl.push("colheita");
  }

  excluirAreaPlantada(key){
    this.db.database.ref("/plantio").child(this.uid).child(key).remove()
    .then(()=>{
      this.getList();
    })
  }

  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }

}
