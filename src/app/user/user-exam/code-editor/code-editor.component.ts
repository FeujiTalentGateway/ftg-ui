import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();

  onCodeChange(code: string) {
    const indentedCode = this.preserveIndentation(code, this.code);
    this.codeChanged.emit(indentedCode);
  }

  private preserveIndentation(newCode: string, oldCode: string): string {
    const newLines = newCode.split('\n');
    const oldLines = oldCode.split('\n');
    return newLines.map((newLine, index) => {
      if (index < oldLines.length) {
        const leadingWhitespaceMatch = oldLines[index].match(/^\s*/);
        const leadingWhitespace = leadingWhitespaceMatch?.[0] ?? ''; 
        return leadingWhitespace + newLine.trim(); 
      } else {
        return newLine.trim(); 
      }
    }).join('\n');
  }
  
}
