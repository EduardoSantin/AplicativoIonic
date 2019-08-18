import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage({
  name:"estoque-produtos"
})
@Component({
  selector: 'page-estoque-produtos',
  templateUrl: 'estoque-produtos.html',
})
export class EstoqueProdutosPage {

  uid: string;
  produto;
  quantidade;
  list;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage,
    public db: AngularFireDatabase) {
  
    }

  addEstoque(produto: string, quantidade: number){
    this.db.database.ref("/estoques").child(this.uid).push({
      produto: produto,
      quantidade: quantidade
    }).then(() =>{
      this.produto = "";
      this.quantidade = "";
    })
  }

  getList(){
    let listDb = this.db.database.ref("/estoques").child(this.uid);
    listDb.on('value', (snapshot) =>{
      const itens = snapshot.val();
      if(itens){
        // tipo um for com javascript
        this.list = Object.keys(itens).map(i => itens[i]);
      }
    })
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }

}
