import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
  name: "login-usuario"
})
@Component({
  selector: 'page-login-usuario',
  templateUrl: 'login-usuario.html',
})
export class LoginUsuarioPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    })
  }
  
  submitForm(){
    console.log(this.loginForm.value);
  }

}
