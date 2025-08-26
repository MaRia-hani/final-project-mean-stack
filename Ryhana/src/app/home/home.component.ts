import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from "../all-products/all-products.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AllProductsComponent, RouterLink], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
}
