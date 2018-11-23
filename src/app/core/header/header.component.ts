import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducres';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private store: Store<fromApp.AppState>,
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
    this.store.dispatch(new AuthActions.Logout());
  }
}
