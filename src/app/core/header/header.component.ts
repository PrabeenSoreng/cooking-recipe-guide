import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducres';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
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
}
