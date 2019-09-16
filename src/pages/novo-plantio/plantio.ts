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
  listFazenda;
  listArea;
  fazendaSelecionada;
  areaSelecionada;
  cultura;
  variedade;
  data;
  nomeFazenda;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }

  salvaPlantio(fazendaSelecionada:string, areaSelecionada:string, cultura:string, variedade:string, data:string){
    this.db.database.ref("/plantio").child(this.uid).push({
      fazenda: fazendaSelecionada,
      area: areaSelecionada,
      cultura: cultura,
      variedade: variedade,
      data: data,
      plantado: true
    }).then(()=>{
      this.fazendaSelecionada = "";
      this.areaSelecionada = "";
      this.cultura = "";
      this.variedade = "";
      this.data = "";
      this.navCtrl.setRoot("areasPlantadas");
    })
  }

  populaSelectFazenda(){
    this.http.get("https://fir-login-26b40.firebaseio.com/fazenda/"+this.uid+'.json')
    .map(res => res.json()).subscribe(data => {
      if(data != null && data != undefined){
        this.trataDadosFazenda(data);
      }
    })
  }
  
  trataDadosFazenda(dados){
    if(dados != null){
      this.listFazenda = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
    }
  }

  populaSelectArea(){
    this.http.get("https://fir-login-26b40.firebaseio.com/areas/"+this.uid+"/Fazenda: "+this.nomeFazenda+".json")
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

  populaProximoSelect(event){
    this.nomeFazenda = event;
    this.populaSelectArea();
  }

  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.populaSelectFazenda();
    })
  }

}
