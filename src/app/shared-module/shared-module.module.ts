import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../pips/time-format.pipe';



@NgModule({
  declarations: [TimeFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeFormatPipe]
})
export class SharedModuleModule { }
