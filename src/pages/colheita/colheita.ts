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
  itemColher;
  list;
  listCalculador;
  item;
  listAreaUnica;
  sacas;
  produtividade;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public db: AngularFireDatabase) {
  }
  
  salvaColheita(sacas, dataColheita, item){
    this.db.database.ref("/plantio").child(this.uid).child(this.itemColher).update({
      colhido: true,
      sacas: sacas,
      dataColhido: dataColheita,
    }).then(()=>{
      this.item = item;
      this.calculaProdutividade();
      this.sacas = sacas;
    })
  }

  // pega todas areas do uid para calcularr
  calculaProdutividade(){
    this.http.get('https://fir-login-26b40.firebaseio.com/areas/'+this.uid+'.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data != null || data != undefined){
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
      // logica para pegar somente a area que foi colhida
      for(var i = 0; i<=this.listCalculador.length; i++){
        if(this.listCalculador[i].nome == this.item.area){
          this.listAreaUnica = this.listCalculador[i];
          this.salvaProdutividade();
          break;
        }
      }
    }
  }

  salvaProdutividade(){
    this.produtividade = (this.sacas/this.listAreaUnica.hectares).toFixed(2);
    this.db.database.ref("/plantio").child(this.uid).child(this.itemColher).update({
      produtividade: this.produtividade+" sacas/ha"
    }).then(()=>{
      // this.storage.remove("itemColher");
      this.navCtrl.setRoot("produtividade");
    })
  }


  // todos os dados da ramificação plantio
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
    this.storage.get("itemColher").then((resolve) => {
      this.itemColher = resolve;
      this.getList();
    })
  }

}
