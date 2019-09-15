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
  produtoNovo;
  quantidadeNovo;
  unidadeSelecionadaNovo;
  item;

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

  salvaEditaEstoque(produtoNovo: string, quantidadeNovo: number, unidadeSelecionadaNovo: string){
    this.db.database.ref("/estoques").child(this.uid).child(this.item.key).set({
      produto: produtoNovo,
      quantidade: quantidadeNovo,
      unidadeSelecionada: unidadeSelecionadaNovo
    }).then(()=>{
      this.storage.remove("item");
      this.navCtrl.setRoot("estoque-produtos");
    })
  }

  populaInput(){
    this.produtoNovo = this.item.produto;
    this.quantidadeNovo = this.item.quantidade;
    this.unidadeSelecionadaNovo = this.item.unidadeSelecionada;
  }

  ionViewDidLoad() {
    this.storage.get("user").then((resolve) => {
      this.uid = resolve;
    })
    this.storage.get("item").then((resolve) => {
      this.item = resolve;
      this.populaInput();
    })
  }

}
