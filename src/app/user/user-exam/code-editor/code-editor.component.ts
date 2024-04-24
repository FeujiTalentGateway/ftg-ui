import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentCodingQuestion:any;
  @Input() codingQuestionIndex!: number;

  darkMode: boolean = false;
  // Default language
  selectedLanguage: string = 'java'; 
  selectedTheme: string = 'monokai'; 

  @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined ;
  private aceEditor: ace.Ace.Editor | undefined;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.aceEditor = ace.edit(this.editor!.nativeElement);
    this.setLanguage(this.selectedLanguage);
    this.setTheme(this.selectedTheme);

    // Attach change event listener here
    this.aceEditor.on("change", () => {
      this.code=this.aceEditor!.getValue();
    });
  }

  setLanguage(language: string) {
    console.log(this.currentCodingQuestion);
    
    switch (language) {
      case 'java':
        this.aceEditor!.session.setMode('ace/mode/java');
        this.aceEditor!.session.setValue(this.currentCodingQuestion.defaultJavaCode);
        break;
      case 'python':
        this.aceEditor!.session.setMode('ace/mode/python');
        this.aceEditor!.session.setValue(this.currentCodingQuestion.defaultPythonCode);
        break;
    }
  }

  setTheme(theme: string) {
    this.aceEditor!.setTheme(`ace/theme/${theme}`);
  }

  toggleDarkMode() {
    if (this.darkMode) {
      this.setTheme('monokai'); // Dark mode theme
    } else {
      this.setTheme('github'); // Light mode theme
    }
  }


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
