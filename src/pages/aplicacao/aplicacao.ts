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
  listInsumos;
  listArea;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage,
    public db: AngularFireDatabase) {
    }

    hectaresTotal;
    dosagemDoInsumo;
    insumo;
    dosagem;

    calcularTotal(quantidade: number, vazao: number){
      this.hectaresTotal = (quantidade/vazao).toFixed(2);
      console.log("ira aplicar "+ this.hectaresTotal+" hectares no total");
    }

    calcular(insumo: string, dosagem: number){
      console.log(insumo);
      this.insumo = insumo;
      this.dosagem = dosagem;
      this.dosagemDoInsumo = (this.hectaresTotal*dosagem).toFixed(2);
    }

    novoInsumo(){
      this.dosagemDoInsumo = null;
      this.insumo = '';
      this.dosagem = '';
    }

  populaInsumo(){
    this.http.get('https://fir-login-26b40.firebaseio.com/estoques/'+this.uid+'.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data != null && data != undefined){
        this.trataDadosInsumo(data);
      }
    })
  }

  trataDadosInsumo(dados){
    if(dados != null){
      this.listInsumos = Object.keys(dados).map(i => {
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


  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.populaInsumo();
      this.populaSelectArea();
    });
  }

}
