import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MessageComponent } from './message.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ MessageComponent],
  exports:[MessageComponent]
})
export class MessageModule { }
