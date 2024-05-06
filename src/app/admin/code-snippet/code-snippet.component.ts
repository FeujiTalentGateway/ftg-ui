import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-sql';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.css']
})
export class CodeSnippetComponent implements OnInit, OnChanges {
  @Input() adminMode: boolean = false;
  @Input() code: string | undefined = '';
  @Input() subject: any;
  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined;
  public aceEditor: ace.Ace.Editor | undefined;
  selectedLanguage: string = 'java';
  selectedTheme: string = 'monokai';
  darkMode: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.subject == 'database') {
      this.selectedLanguage = 'sql';
    } else {
      this.selectedLanguage = (this.subject as string).toLowerCase();
    }
    this.setLanguage(this.selectedLanguage);
    this.aceEditor?.session.setValue(this.code as string);
    // Ensure left-to-right text direction
    // this.aceEditor?.container.style.direction = 'ltr';
    if (this.aceEditor){
      this.aceEditor.container.style.direction = 'ltr';
    }
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.aceEditor = ace.edit(this.editor!.nativeElement);
    this.aceEditor.container.style.direction = 'ltr';
    this.setLanguage(this.selectedLanguage);
    this.setTheme(this.selectedTheme);
    this.aceEditor.on("change", () => {
      this.code = this.aceEditor!.getValue();
      this.codeChanged.emit(this.code);
    });
    // Set code value
    this.aceEditor.session.setValue(this.code as string);
    // Enable read-only mode if adminMode is false
    if (!this.adminMode) {
      this.aceEditor.setReadOnly(true);
    }
  }

  setLanguage(language: string) {
    if (this.aceEditor) {
      switch (language) {
        case 'java':
          this.aceEditor.session.setMode('ace/mode/java');
          break;
        case 'python':
          this.aceEditor.session.setMode('ace/mode/python');
          break;
        case 'sql':
          this.aceEditor.session.setMode('ace/mode/sql');
          break;
      }
    } else {
      console.error("Ace editor is not initialized.");
    }
  }

  setTheme(theme: string) {
    if (this.aceEditor) {
      this.aceEditor.setTheme(`ace/theme/${theme}`);
    } else {
      console.error("Ace editor is not initialized.");
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const theme = this.darkMode ? 'monokai' : 'github';
    this.setTheme(theme);
  }
}
