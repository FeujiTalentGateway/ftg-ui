import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
})
export class MainHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
      // Set a custom message that will be displayed alongside the default browser message
      const confirmationMessage = "Are you sure you want to leave? All your progress will be lost.";
      return confirmationMessage;
  }
  

}
