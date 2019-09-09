import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';

@IonicPage({
  name: "editaEstoque"
})
@Component({
  selector: 'page-edita-estoque',
  templateUrl: 'edita-estoque.html',
})
export class EditaEstoquePage {

  uid: string;
  id: string;
  produtoNovo;
  quantidadeNovo;
  unidadeSelecionadaNovo;

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
    public storage: Storage,
    public db: AngularFireDatabase,
    public http: Http) {
  }

  editaEstoque(produtoNovo: string, quantidadeNovo: number, unidadeSelecionadaNovo: string){
    this.db.database.ref("/estoques").child(this.uid).child(this.id).set({
      produto: produtoNovo,
      quantidade: quantidadeNovo,
      unidadeSelecionada: unidadeSelecionadaNovo
    }).then(()=>{
      this.removeStorage();
      this.navCtrl.push("estoque-produtos");
    })
  }

  removeStorage(){
    this.storage.remove("id");
    this.storage.remove("produto");
    this.storage.remove("quantidade");
    this.storage.remove("unidadeSelecionada");
  }


  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("id").then((resolve) => {
      this.id = resolve;
    })
    this.storage.get("produto").then((resolve) => {
      this.produtoNovo = resolve;
    })
    this.storage.get("quantidade").then((resolve) => {
      this.quantidadeNovo = resolve;
    })
    this.storage.get("unidadeSelecionada").then((resolve) => {
      this.unidadeSelecionadaNovo = resolve;
    })
  }

}
