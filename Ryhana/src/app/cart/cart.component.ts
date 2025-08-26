import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  userCart:any = undefined;
  userId = localStorage.getItem('userId')||'';

  ngOnInit(): void {
    this.getUserCart();
    this.cartService.userCart.subscribe(
      cart => this.userCart = cart
    );
  }

  getUserCart(){
    if(!this.userCart){
      this.cartService.getCartItems(this.userId).subscribe((cart)=>{
        this.cartService.userCart.next(cart);
      })
    }
  }

  getNotificationNumber():number{
    if(this.userCart){
      return this.userCart.items.reduce((total:any,item:any)=>total + item.quantity,0);
    }
    return 0;
  }

  refreshList(){
    this.cartService.getCartItems(this.userId).subscribe(
      (data)=>{this.cartService.userCart.next(data)}
    );
  }

  removeOneItem(item:any){
    console.log(item);
    const payload = {
      userId: this.userId,
      productId: item.productId,
      size: item.size,
      quantity: item.quantity
    }
    console.log(payload)
    this.cartService.removeFromCart(payload).subscribe(
      ()=>{
        this.refreshList();
      }
    )
  }

  addToCart(product:any){
    const cartItem = {
      userId:localStorage.getItem('userId'),
      productId:product.productId,
      name:product.name,
      price:product.price,
      size:product.size,
      quantity:1
    }
    this.cartService.addToCart(cartItem).subscribe({
      next: (data)=>{this.refreshList()},
      error: (err)=>{console.log(err)}
    });
  }

  addOneItem(item:any){
    console.log(item);
    this.addToCart(item);
  }
}
