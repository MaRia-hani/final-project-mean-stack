import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../modules/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-all-products',
  imports: [],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{
  productService = inject(ProductService);
  cartService = inject(CartService);
  
  userId = localStorage.getItem('userId');
  products:product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products)=>{
      products.map((product:product)=>{
        product.img = product.img.replace('/imges','http://localhost:3000/imgs');
      });
      this.products = products;
    })
  }

  refreshList(){
    this.cartService.getCartItems(this.userId||'').subscribe({
      next: (data)=>{this.cartService.userCart.next(data)}
    });
  }

  addToCart(product:any){
    const cartItem = {
      userId:this.userId,
      productId:product._id,
      name:product.name,
      price:product.price,
      size:product.size,
      quantity:1
    }
    this.cartService.addToCart(cartItem).subscribe({
      next: (data)=> {this.refreshList()},
      error: (err)=> {console.log(err)}
    });
  }
}
