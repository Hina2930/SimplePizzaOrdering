import { Component, OnInit, Input   } from '@angular/core';
import { PizzaSize } from '../models/pizzasize';
import { VegTopping } from '../models/vegtopping';
import { NonVegTopping } from '../models/nonvegtopping';
import { PromotionalOffer } from '../models/promotionaloffer';
import { OrderPlaced } from '../models/orderplaced';
import { PIZZASIZES, VEGTOPPINGS, NONVEGTOPPINGS, PROMOTIONALOFFERS } from '../models/constants';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderListingComponent } from '../order-listing/order-listing.component';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  pizzasizes = PIZZASIZES;
  vegtoppings = VEGTOPPINGS;
  nonvegtoppings = NONVEGTOPPINGS;
  promotionaloffers = PROMOTIONALOFFERS;
  orderPlaced : OrderPlaced;

  selectedpizzaSize?: PizzaSize;
  dropdownSettingsForVeg:IDropdownSettings={};
  dropdownSettingsForNonVeg:IDropdownSettings={};
  dropdownSettingsForProm:IDropdownSettings={};
  totalPrice : number = 0;
  constructor(private router: Router, private activedrouter: ActivatedRoute) { 
    this.orderPlaced =  {} as OrderPlaced;
    
    activedrouter.queryParams.subscribe((res)=> {this.orderPlaced.id = res['id']}) }
  selectedVegItem : any;
  selectedNonVegItem : any;
  
  ngOnInit(){
    const allrecords = localStorage.getItem("orderplaceList");
    debugger;
    if(allrecords !== null){
      const orderlist = JSON.parse(allrecords);
      const currentOrder = orderlist.find((c: OrderPlaced) => c.id == this.orderPlaced.id);

      if(currentOrder !== undefined)
      {
        this.selectedpizzaSize = currentOrder.pizzasize;
        this.selectedVegItem = currentOrder.vegtoppings;
        this.selectedNonVegItem = currentOrder.nonvegtoppings;
        this.totalPrice = currentOrder.totalbill;
      }
    }
    this.dropdownSettingsForVeg = {
      idField : 'id',
      textField: 'name' 
    };
   
    this.dropdownSettingsForNonVeg = {
      idField : 'id',
      textField: 'name' 
    };
    this.dropdownSettingsForProm = {
      idField : 'id',
      textField: 'name',
      limitSelection : 1 
    };
  }

  onSelect(pizzasize: PizzaSize): void {
    this.totalPrice -= this.selectedpizzaSize == undefined ? 0: this.selectedpizzaSize?.prize;
    this.selectedpizzaSize = pizzasize;
    this.totalPrice += pizzasize.prize;
  }
  
  onItemSelect(item: any, modelName : string) {
    this.totalPrice += this.getPrice(item,modelName) as number;
}
onItemDeSelect(item: any, modelName : string) {
    this.totalPrice -= this.getPrice(item,modelName) as number;
}
onSelectAll(modelName : string) {
  this.totalPrice -= this.getSelectedItemsPrice(modelName) as number;
  this.totalPrice += this.getAllPrice(modelName);
}
onUnSelectAll(modelName : string) {
    this.totalPrice -= this.getAllPrice(modelName) ;
}

getPrice(item: any, modelName : string){

  switch(modelName){
    case 'Veg':
      return this.vegtoppings.find(x => x.id == item.id)?.prize;
      break;
      case 'NonVeg':
        return this.nonvegtoppings.find(x => x.id == item.id)?.prize;
        break;
      case 'Promotional':
      //  var promotionaloffer =  this.promotionaloffers.find(x => x.id == item.id);
      // if(!promotionaloffer?.isdiscount){
      //    return promotionaloffer?.prize;
      // }else{
      //   return promotionaloffer?.prize;
      // }
      break;
      default:
        return 0;
  }
  return 0;
}
getAllPrice(modelName : string){

  switch(modelName){
    case 'Veg':
      return this.vegtoppings.reduce((prev,next)=>prev+next.prize,0);    
      break;
      case 'NonVeg':
        return this.nonvegtoppings.reduce((prev,next)=>prev+next.prize,0);    
        break;
      case 'Promotional':
      // var promotionaloffer =  this.promotionaloffers.find(x => x.id == item.id);
      // if(!promotionaloffer?.isdiscount){
      //   return promotionaloffer?.prize;
      // }else{
      //   return promotionaloffer?.prize;
      // }
      break;
      default:
        return 0;
  }
  return 0;
}
getSelectedItemsPrice(modelName : string){
  let total;
  switch(modelName){
   
    case 'Veg':
      total = this.selectedVegItem == undefined ? 0 : this.vegtoppings.filter(x => this.selectedVegItem.find((y: { id: number; }) => y.id == x.id)).reduce((prev: any,next: { prize: any; })=> prev+next.prize,0);  
      break;
      case 'NonVeg':
        total =  this.selectedNonVegItem == undefined ? 0 : this.nonvegtoppings.filter(x => this.selectedNonVegItem.find((y: { id: number; }) => y.id == x.id)).reduce((prev: any,next: { prize: any; })=> prev+next.prize,0);  
        break;
      case 'Promotional':
      // var promotionaloffer =  this.promotionaloffers.find(x => x.id == item.id);
      // if(!promotionaloffer?.isdiscount){
      //   return promotionaloffer?.prize;
      // }else{
      //   return promotionaloffer?.prize;
      // }
      break;
      default:
        break;
  }
  return total == undefined ? 0 :  total; 
}

onSubmit(): void{
  const orderPlaced = {} as OrderPlaced ;
  let currentOrder = [];
  const allrecords = localStorage.getItem("orderplaceList");
  if(allrecords !== null){
    currentOrder = JSON.parse(allrecords);
    if(this.orderPlaced !== undefined && this.orderPlaced.id !== undefined)
      currentOrder.splice(currentOrder.find((x: any) => x.id ==this.orderPlaced.id));
  }
  orderPlaced.id = this.orderPlaced !== undefined && this.orderPlaced.id !== undefined? this.orderPlaced.id : currentOrder?.length + 1;
  orderPlaced.pizzasize = this.selectedpizzaSize;
  orderPlaced.vegtoppings = this.selectedVegItem == undefined ? null: this.vegtoppings.filter(x => this.selectedVegItem.find((y: { id: number; }) => y.id == x.id));
  orderPlaced.nonvegtoppings = this.selectedNonVegItem == undefined ? null: this.nonvegtoppings.filter(x => this.selectedNonVegItem.find((y: { id: number; }) => y.id == x.id));
  orderPlaced.totalbill = this.totalPrice;
  currentOrder.push(orderPlaced);
  localStorage.setItem("orderplaceList", JSON.stringify(currentOrder));
  this.router.navigate(['/order']);
}
back():void{
  this.router.navigate(['/order']);
}
}
