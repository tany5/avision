import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
orderDetilas = []
  constructor(private orderService: OrderService) {
    this.orderService.getOrder(localStorage.getItem('currentUserId')).subscribe(
      (res)=> {
        console.log(res)
        if(res['status']==200) {
          this.orderDetilas = res['order_history']
        }
        else {
          this.orderDetilas = []
        }

      })
   }

  ngOnInit(): void { 
  }


}
