import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaFazendaPage } from './nova-fazenda';

@NgModule({
  declarations: [
    NovaFazendaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaFazendaPage),
  ],
})
export class NovaFazendaPageModule {}
