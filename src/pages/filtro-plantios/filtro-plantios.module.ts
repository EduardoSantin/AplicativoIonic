import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroPlantiosPage } from './filtro-plantios';

@NgModule({
  declarations: [
    FiltroPlantiosPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroPlantiosPage),
  ],
})
export class FiltroPlantiosPageModule {}
