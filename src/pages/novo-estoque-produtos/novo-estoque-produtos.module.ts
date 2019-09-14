import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoEstoqueProdutosPage } from './novo-estoque-produtos';

@NgModule({
  declarations: [
    NovoEstoqueProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoEstoqueProdutosPage),
  ],
})
export class NovoEstoqueProdutosPageModule {}
