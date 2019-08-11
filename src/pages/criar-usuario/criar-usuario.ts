import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public formbuilder: FormBuilder) {
    this.registreForm = this.formbuilder.group({
      name : [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    })
  }

  submitForm(){
    console.log(this.registreForm.value);
  }

}
