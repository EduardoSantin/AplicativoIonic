import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name:"areas"
})
@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html',
})
export class AreasPage {

  uid;
  nomeFazenda;
  list;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }

  getList(){
    this.http.get("https://fir-login-26b40.firebaseio.com/areas/"+this.uid+"/Fazenda: "+this.nomeFazenda+".json")
    .map(res => res.json()).subscribe(data => {
      if(data != null && data != undefined){
        this.trataDados(data);
      }
    });
  }

  trataDados(dados){
    if(dados != null){
      this.list = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
    }
  }

  
  editarArea(item){
    this.storage.set("item", item);
    this.navCtrl.push("editaArea");
  }
  
  excluirArea(key){
    this.db.database.ref("areas").child(this.uid)
    .child("Fazenda: "+this.nomeFazenda).child(key)
    .remove().then(() => {
      this.getList();
    })
  }
  
  ionViewDidLoad() {
    this.storage.get("nomeFazenda").then((resolve) => {
      this.nomeFazenda = resolve;
    })
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }
}