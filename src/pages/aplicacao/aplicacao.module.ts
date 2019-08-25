import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AplicacaoPage } from './aplicacao';

@NgModule({
  declarations: [
    AplicacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AplicacaoPage),
  ],
})
export class AplicacaoPageModule {}
