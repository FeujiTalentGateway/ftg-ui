import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(timeStr: string): string {
    const timeArray = timeStr.split(':');
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    const seconds = parseInt(timeArray[2], 10);
    
    let formattedTime = '';

    if (hours > 0) {
      formattedTime += `${hours} hours `;
    }

    if (minutes > 0) {
      formattedTime += `${minutes} min `;
    }
    if (seconds > 0) {
      formattedTime += `${seconds} sec`;
    }

    return formattedTime.trim();
  }
}
