import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from 'src/_models/order';
import { OrderService } from 'src/_service/order.service';

import { Product } from 'src/_models/product';
import { OrderDetail } from 'src/_models/orderDetail';
import { Customer } from 'src/_models/customer';
import { ProductService } from 'src/_service/product.service';
import { CustomerService } from 'src/_service/customer.service';
import { LoginService } from 'src/_service/login.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { createQuoteDetailsDto } from 'src/_models/createQuoteDetailsDto';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.css']
})

export class OrderuserComponent implements OnInit {
  User: string;
  Username: string;
  customer: Customer;
  order: Order;
  stringCurrency:string;
  quotesNumber:number;
  customers: Array<Customer>;
  orderDetails: Array<OrderDetail>;
  products: Array<Product>;
  product
  frecuency:number;
  stringFrecuency:string;
  currencies=['Soles','Dolares']
  frecuencies = ["Semanal","Quincenal","Mensual"]

  productseleccionado: Product;
  id: number;
  private sub: any;
  constructor(private orderService: OrderService, private productService: ProductService,
    private customerService: CustomerService, private loginservice: LoginService, private route: ActivatedRoute,
    private router: Router,private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

    });

    this.Username = this.loginservice.getEmail();
    console.log(this.Username)
    
    this.product = new Product();
    
 

    this.orderDetails = new Array<OrderDetail>();
    this.order = new Order();

    this.productService.getAllProducts().subscribe((data:any) => {
      this.products = data.items;
      console.log(this.products)
    });
    this.customerService.getAllCustomers().subscribe((data:any) => {
      this.customers = data.items;
    })
    this.customerService.getByEmail(this.Username).subscribe(data => {
      this.customer = data;
      console.log(this.customer)
    })
  }

  register() {
    this.order.orderDetails = this.orderDetails;
    //Creacion de la cuota
    let QuoteDetails = new createQuoteDetailsDto();
    QuoteDetails.NumberQuotes = this.quotesNumber

    if(this.stringFrecuency == this.frecuencies[0])
    this.frecuency = 7
    if(this.stringFrecuency == this.frecuencies[1])
    this.frecuency = 15
    if(this.stringFrecuency == this.frecuencies[2])
    this.frecuency = 30


    QuoteDetails.Frecuency = this.frecuency;
    QuoteDetails.Currency = this.stringCurrency;
    this.order.quoteDetails = QuoteDetails;
    
    console.log(this.order)
    //Funcion de la creacion de la orden
    this.orderService.registerOrder(this.order).subscribe((data:any) => {
      this.orderService.getAllOrders().
        map((users: Array<Order>) => users.filter(user => user.costumer.username === this.Username)).subscribe(orders => {
          this.orderService.ordersChange.next(orders);
          this.orderService.message.next("Se registro la orden");
        });
        this.matSnackBar.open(data.detalleDeOrden.value.message,'INFO',{
          duration:2000
        });
        this.router.navigate(['/angular/home']);
     
    });
  }

  close() {
    this.router.navigate(['/angular/products']);
  }

  AddOrderDetail(quantity: number) {
    if(quantity >0){

    this.order.customerId = this.customer.customerId;
    let _orderDetail = new OrderDetail();
    _orderDetail.product = this.product;
    _orderDetail.productId = this.product.productId;
    _orderDetail.quantity = quantity;
    this.orderDetails.push(_orderDetail);
    console.log(this.orderDetails)
    }
  }

  DeleteLastOrderDetial() {
    this.orderDetails.pop();
  }
}
