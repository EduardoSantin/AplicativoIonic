import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public db: AngularFireDatabase,
    public alertaController: AlertController) {
    }

    hectaresTotal = null;
    dosagemDoInsumo;
    insumo;
    dosagem;

    presentAlert(title: string, subTitle: string){
      let alert = this.alertaController.create({
        title: title,
        subTitle: subTitle,
        buttons: ['OK']
      });
      alert.present();
    }

    calcularTotal(quantidade: number, vazao: number){
      this.hectaresTotal = (quantidade/vazao).toFixed(2);
      if(this.hectaresTotal == "NaN" || this.hectaresTotal<= 0){
        this.presentAlert("Erro", "Invalido digite novamente")
        this.hectaresTotal = null;
      }
    }

    calcular(insumo: string, dosagem: number){
      this.insumo = insumo;
      this.dosagem = dosagem;
      this.dosagemDoInsumo = (this.hectaresTotal*dosagem).toFixed(2);
      console.log(this.dosagemDoInsumo)
      if(this.dosagemDoInsumo <= 0 || this.dosagemDoInsumo == "NaN"){
        this.presentAlert("Erro", "Tente novamente")
        this.dosagemDoInsumo = null;
      }
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
