import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name:"novo-plantio"
})
@Component({
  selector: 'page-plantio',
  templateUrl: 'plantio.html',
})
export class PlantioPage {

  uid;
  listArea;
  areaSelecionada;
  cultura;
  variedade;
  data;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }

  salvaPlantio(areaSelecionada:string, cultura:string, variedade:string, data: String){
    this.db.database.ref("/plantio").child(this.uid).push({
      area: areaSelecionada,
      cultura: cultura,
      variedade: variedade,
      data: this.formatDate(data , 'pt-br'),
      colhido: false
    }).then(()=>{
      console.log(this.data)
      this.areaSelecionada = "";
      this.cultura = "";
      this.variedade = "";
      this.data = "";
      this.navCtrl.setRoot("areasPlantadas");
    })
  }

  formatDate(data, formato) {
    if (formato == 'pt-br') {
      return (data.substr(0, 10).split('-').reverse().join('/'));
    } else {
      return (data.substr(0, 10).split('/').reverse().join('-'));
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
      this.populaSelectArea();
    })
  }

}
