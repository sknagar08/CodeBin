import { Component, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading = signal(false);

  startLoading() {
    this.loading.set(true);
  }

  stopLoading() {
    this.loading.set(false);
  }
}
