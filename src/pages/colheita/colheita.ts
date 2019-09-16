import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage({
  name: "colheita"
})
@Component({
  selector: 'page-colheita',
  templateUrl: 'colheita.html',
})
export class ColheitaPage {

  uid;
  item;
  list;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http) {
  }
  
  salvaColheita(item, sacas, dataColheita){

    this.storage.remove("item");
  }

  getList(){
    console.log(this.item);
    this.http.get('https://fir-login-26b40.firebaseio.com/plantio/'+this.uid+'/'+this.item.key+'.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data != null && data != undefined){
        this.trataDados(data);
      }
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


  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("item").then((resolve) => {
      this.item = resolve;
      this.getList();
    })
  }

}
