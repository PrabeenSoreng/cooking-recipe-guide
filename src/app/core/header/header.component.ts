import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
