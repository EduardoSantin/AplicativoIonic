import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoAnotacaoPage } from './novo-anotacao';

@NgModule({
  declarations: [
    NovoAnotacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoAnotacaoPage),
  ],
})
export class NovoAnotacaoPageModule {}
