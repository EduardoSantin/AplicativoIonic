import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';

@IonicPage({
  name:"estoque-produtos"
})
@Component({
  selector: 'page-estoque-produtos',
  templateUrl: 'estoque-produtos.html',
})
export class EstoqueProdutosPage {

  uid: string;
  list;
  // produto;
  // quantidade;
  // unidadeSelecionada;
  // listEditar;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
    }
  
  excluirEstoque(key){
    this.db.database.ref("/estoques").child(this.uid).child(key).remove()
    .then(() => {
      this.getList();
    })
  }

  editarEstoque(item){
    this.storage.set("item", item);
    this.navCtrl.push("editaEstoque");
  }

  getList(){
    this.http.get('https://fir-login-26b40.firebaseio.com/estoques/'+this.uid+'.json')
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

  
  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }
  
}