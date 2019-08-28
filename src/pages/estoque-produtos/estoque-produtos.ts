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
  produto;
  quantidade;
  unidadeSelecionada;
  list;


  // unidades de medidas para popular select
  unidade: any[] = [
    {
      id:1,
      name: ' T (Toneladas)'
    },
    {
      id:2,
      name: 'L (Litros)'
    },
    {
      id:3,
      name: 'ml (Mililitros)'
    },
    {
      id:4,
      name: 'kg (Kilogramas)'
    },
    {
      id:5,
      name: 'g (Gramas)'
    },
    {
      id:6,
      name: 'mg (Miligramas)'
    }
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
  
    }

  addEstoque(produto: string, quantidade: number, unidadeSelecionada: string){
    this.db.database.ref("/estoques").child(this.uid).push({
      produto: produto,
      quantidade: quantidade,
      unidadeSelecionada: unidadeSelecionada
    }).then(() =>{
      this.produto = "";
      this.quantidade = "";
      this.unidadeSelecionada = "";
      this.getList();
    })
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
      this.list = Object.keys(dados).map(i => dados[i]);
    }
  }

  
  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
      this.getList();
    })
  }
  
}

// getList(){
//   let listDb = this.db.database.ref("/estoques").child(this.uid);
//   listDb.on('value', (snapshot) =>{
//     const itens = snapshot.val();
//     if(itens){
//       this.list = Object.keys(itens).map(i => itens[i]);
//     }
//   })
// }