import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


@IonicPage({
  name: "previsao"
})
@Component({
  selector: 'page-previsao',
  templateUrl: 'previsao.html',
})
export class PrevisaoPage {

  previsao:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HTTP) {
  }

  ionViewDidLoad(){
    this.http.get('https://api.hgbrasil.com/weather?woeid=459427', {}, {}).then(data => {

      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
      this.previsao = JSON.parse(data.data);
    }).catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }
}
