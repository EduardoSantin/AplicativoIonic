import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaEstoquePage } from './edita-estoque';

@NgModule({
  declarations: [
    EditaEstoquePage,
  ],
  imports: [
    IonicPageModule.forChild(EditaEstoquePage),
  ],
})
export class EditaEstoquePageModule {}
