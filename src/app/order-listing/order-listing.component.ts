import { Component, OnInit  } from '@angular/core';
import { OrderPlaced } from '../models/orderplaced';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css']
})
export class OrderListingComponent implements OnInit {
  orderplaceList: OrderPlaced [];
  constructor(private router: Router) { 
    window.onbeforeunload = function() {
      localStorage.clear();
      return '';
    };
      this.orderplaceList = [];
    }
    ngOnInit(): void {
        const records = localStorage.getItem("orderplaceList");
        if(records !== null){
          this.orderplaceList = JSON.parse(records);
        }
    }

    delete(id : number){
      const allrecords = localStorage.getItem("orderplaceList");
      debugger
      if(allrecords !== null){
        var currentList = JSON.parse(allrecords);
        currentList = currentList.filter((x: any) => x.id !== id);
        localStorage.setItem("orderplaceList", JSON.stringify(currentList));

      }
      const records = localStorage.getItem("orderplaceList");

        if(records !== null){
          this.orderplaceList = JSON.parse(records);
        }
    }

    edit(id : number){
      this.router.navigate(['/order/place'], { queryParams: {id: id} });
    }
}
