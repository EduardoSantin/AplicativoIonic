import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "login-usuario"
})
@Component({
  selector: 'page-login-usuario',
  templateUrl: 'login-usuario.html',
})
export class LoginUsuarioPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    })
  }
  
  submitLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.senha)
    .then((response) => {
      this.storage.set("user", response.user.uid).then(() => {
        this.navCtrl.setRoot("start-page");
      })
    }). catch((error) => {
      if(error.code == 'auth/wrong-password'){
        this.presentAlert("Erro", "Senha incorreta, digite novamente");
        this.loginForm.controls['senha'].setValue(null);
      }
      if(error.code == 'auth/user-not-found'){
        this.presentAlert("Erro", "Usuario não encontrado");
        this.loginForm.controls['email'].setValue(null);
        this.loginForm.controls['senha'].setValue(null);
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
