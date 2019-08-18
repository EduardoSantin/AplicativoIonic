import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoqueProdutosPage } from './estoque-produtos';

@NgModule({
  declarations: [
    EstoqueProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoqueProdutosPage),
  ],
})
export class EstoqueProdutosPageModule {}
