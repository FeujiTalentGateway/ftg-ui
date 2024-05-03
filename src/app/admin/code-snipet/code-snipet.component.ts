import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-sql';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snipet.component.html',
  styleUrls: ['./code-snipet.component.css']
})
export class CodeSnippetComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.subject);
    if (this.subject == 'database'){
      console.log("ok");
      
      this.selectedLanguage = 'sql'
    }
    else{
      this.selectedLanguage =  this.subject
      console.log(this.subject,"------------------");
      
    }
    this.setLanguage(this.subject)
  }
  ngOnInit(): void {
    console.log(this.selectedLanguage);
    console.log(this.code);
  
    // this.aceEditor?.session.setValue(this.code as string)
    // console.log(this.aceEditor!.getValue());
    
    
  }
  
  darkMode: boolean = false;
  // Default language
  selectedLanguage: string = 'java'; 
  selectedTheme: string = 'monokai'; 
  @Input() adminMode :boolean = false;
  @Input() code: string| undefined = '' ;
  @Input() subject:any 
  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined ;
  public aceEditor: ace.Ace.Editor | undefined;
  ngAfterViewInit(): void {

    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.aceEditor = ace.edit(this.editor!.nativeElement);
    this.setLanguage(this.selectedLanguage);
    this.setTheme(this.selectedTheme);

    this.aceEditor.on("change", () => {
      this.code=this.aceEditor!.getValue();
      this.codeChanged.emit(this.code)
    });
    this.aceEditor?.session.setValue(this.code as string)
    console.log(this.aceEditor!.getValue());   
    this.setLanguage(this.subject)
    
  }

  setLanguage(language: string) {
    
    switch (language) {
      case 'java':
        this.aceEditor!.session.setMode('ace/mode/java');
        
        break;
      case 'python':
        this.aceEditor!.session.setMode('ace/mode/python');
        
        break;
      case 'sql':
        this.aceEditor!.session.setMode("ace/mode/sql");
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

}
