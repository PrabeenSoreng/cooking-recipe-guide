import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAuEbeq1rkaf6ftYUUpv_neSFCOFwTWiAQ",
      authDomain: "ng-recipe-book-7281c.firebaseapp.com"
    });
  }
}
