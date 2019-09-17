import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage({
  name: "colheita"
})
@Component({
  selector: 'page-colheita',
  templateUrl: 'colheita.html',
})
export class ColheitaPage {

  uid;
  keyColher;
  list;
  listCalculador;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }
  
  salvaColheita(sacas, dataColheita){
    this.db.database.ref("/plantio").child(this.uid).child(this.keyColher).update({
      plantado: false,
      sacas: sacas,
      dataColhido: dataColheita
    }).then(()=>{
      this.calculaProdutividade();
      this.storage.remove("keyColher");
      this.navCtrl.setRoot("areasPlantadas");
    })
  }

  // tentando pegar area para calcularr
  calculaProdutividade(){
    console.log(this.list);
    this.http.get("https://fir-login-26b40.firebaseio.com/areas/"+this.uid+"/Fazenda: "+this.list.fazenda+".json")
    .map(res => res.json())
    .subscribe(data => {
      if(data != null || data != undefined){
        console.log("entrou no if");
        this.trataCalculador(data);
      }
    })
  }

  trataCalculador(dados){
    if(dados != null){
      this.listCalculador = Object.keys(dados).map(i => {
        dados[i].key = i;
        return dados[i];
      });
      console.log(this.listCalculador);
    }
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


  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("keyColher").then((resolve) => {
      this.keyColher = resolve;
      this.getList();
    })
  }

}
