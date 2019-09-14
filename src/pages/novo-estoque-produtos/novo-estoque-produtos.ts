import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "novo-estoque"
})

@Component({
  selector: 'page-novo-estoque-produtos',
  templateUrl: 'novo-estoque-produtos.html',
})
export class NovoEstoqueProdutosPage {

  uid: string;
  produto;
  quantidade;
  unidadeSelecionada;
  list;
  listEditar;

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
    public db: AngularFireDatabase,
    public storage: Storage) {
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
      this.navCtrl.setRoot("estoque-produtos");
    })
  }

  ionViewDidLoad(){
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
  }

}
