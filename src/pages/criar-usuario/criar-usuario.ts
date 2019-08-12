import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

@IonicPage({
  name: "cria-usuario"
})
@Component({
  selector: 'page-criar-usuario',
  templateUrl: 'criar-usuario.html',
})
export class CriarUsuarioPage {

  registreForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController) {
    this.registreForm = this.formbuilder.group({
      name : [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    })
  }

  submitForm(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.registreForm.value.email, 
      this.registreForm.value.senha)
      .then((response) => {
        this.presentAlert("SUCESSO", "Usuario Cadastrado com Sucesso");
        this.navCtrl.setRoot('start-page');
      }).catch((error) =>{
        if(error.code == 'auth/email-already-in-use'){
          this.presentAlert("Erro", "E-mail ja existente");
        }
      })
  }

  presentAlert(title: string, subTitle: string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
