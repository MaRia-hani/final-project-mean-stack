
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CartComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);

  menuOpen: boolean = false;
  products: any[] = [];
  cartItems: any[] = [];
  totalPrice: number = 0;
  orderStatus: string | null = null;
  
  localStorage = localStorage;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  

  ngOnInit() {
    this.cartService.getCartItems(this.localStorage.getItem('userId')||'').subscribe((cartItems)=>{
      this.cartItems = cartItems;
      this.totalPrice = this.cartService.getTotalPrice(cartItems);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.clearCart();
    }
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return this.authService.isLoggedIn();
    }
    return false;
  }

  clearCart() {
    this.cartService.clearCart();
  }

  placeorder() {
    this.orderStatus = 'pending';
    alert('Your order is placed successfully. Status: Pending.');
    this.clearCart();
  }
}
