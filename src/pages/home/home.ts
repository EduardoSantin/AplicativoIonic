import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

// @IonicPage({
//   name: 'page-home'
// })

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

}
