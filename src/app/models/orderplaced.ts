import { NonVegTopping } from "./nonvegtopping";
import { PizzaSize } from "./pizzasize";
import { VegTopping } from "./vegtopping";

export interface OrderPlaced {
    id: number;
    pizzasize?: PizzaSize;
    vegtoppings? : Array<VegTopping> | null;
    nonvegtoppings?: Array<NonVegTopping>  | null;
    totalbill : number;
  }
  