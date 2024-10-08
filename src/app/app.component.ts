import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'code-bin';
  constructor() {
    initializeApp(firebaseConfig);
  }
}
