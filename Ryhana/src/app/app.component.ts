import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Ryhana';
  ngOnInit(): void { }
}
