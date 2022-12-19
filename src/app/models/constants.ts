import { PizzaSize } from './pizzasize';
import { VegTopping } from './vegtopping';
import { NonVegTopping } from './nonvegtopping';
import { PromotionalOffer } from './promotionaloffer';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';

export const PIZZASIZES: PizzaSize[] = [
  { prize: 5, name: 'Small' },
  { prize: 7, name: 'Medium' },
  { prize: 8, name: 'Large' },
  { prize: 9, name: 'Extra Large' }
];

export const VEGTOPPINGS: VegTopping[] = [
  { id:1, prize: 1, name: 'Tomatoes - ($1.00)' },
  { id:2, prize: 0.5, name: 'Oinions - ($0.5)' },
  { id:3, prize: 1, name: 'Bell Paper - ($1.00)' },
  { id:4, prize: 1.20, name: 'Mushrooms - ($1.20)' },
  { id:5, prize: 0.75, name: 'Pineapple - ($0.75)' }
];

export const NONVEGTOPPINGS: NonVegTopping[] = [
  { id:1,prize: 1, name: 'Sausage($1.00)' },
  {id:2, prize: 2, name: 'Pepperoni($2.00)' },
  {id:3, prize: 3, name: 'Barbecue Chicken($3.00)' }
];

export const PROMOTIONALOFFERS: PromotionalOffer[] = [
  {id:1, prize: 5, name: 'Offer 1 ($5)', descritpion : "1 Medium Pizza with 2 topping", isdiscount : false, discountpercent : 0},
  {id:2, prize: 9, name: 'Offer 2 ($9)', descritpion : "2 Medium Pizza with 4 topping each", isdiscount : false, discountpercent : 0},
  {id:3, prize: 0, name: 'Offer 3 (50%)', descritpion: "1 Large with 4 toppings (Pepperoni and Barbecue chicken are counted as 2 toppings)", isdiscount : true , discountpercent : 50}
];