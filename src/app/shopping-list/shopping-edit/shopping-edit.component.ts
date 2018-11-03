import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListServicve: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd(name: HTMLInputElement, amount: HTMLInputElement) {
    const newIngredient = new Ingredient(name.value, Number(amount.value));
    this.shoppingListServicve.addIngredient(newIngredient);
  }
}
