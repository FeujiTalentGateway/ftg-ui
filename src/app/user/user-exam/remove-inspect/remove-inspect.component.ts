import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-devtools-test',
  template: `
    <h1>Test Page</h1>
  `,
  styles: []
})
export class RemoveInspectComponent {

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event): void {
    event.preventDefault();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (
      event.keyCode === 123 ||
      (event.ctrlKey && event.shiftKey && event.key === 'I') ||
      (event.ctrlKey && event.shiftKey && event.key === 'J') ||
      (event.ctrlKey && event.shiftKey && event.key === 'C') ||
      (event.ctrlKey && event.key === 'U') ||
      (event.ctrlKey && event.keyCode === 116) || // Ctrl + F5
      (event.ctrlKey && event.shiftKey && event.key === 'R') || // Ctrl + Shift + R
      (event.ctrlKey && event.key === 'R') // Ctrl + R
    ) {
      event.preventDefault();
    }
  }
}