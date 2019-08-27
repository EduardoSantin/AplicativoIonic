import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrevisaoPage } from './previsao';

@NgModule({
  declarations: [
    PrevisaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PrevisaoPage),
  ],
})
export class PrevisaoPageModule {}
