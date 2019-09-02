import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListFazendaPage } from './list-fazenda';

@NgModule({
  declarations: [
    ListFazendaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListFazendaPage),
  ],
})
export class ListFazendaPageModule {}
