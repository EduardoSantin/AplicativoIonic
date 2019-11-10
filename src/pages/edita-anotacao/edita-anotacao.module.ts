import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaAnotacaoPage } from './edita-anotacao';

@NgModule({
  declarations: [
    EditaAnotacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaAnotacaoPage),
  ],
})
export class EditaAnotacaoPageModule {}
