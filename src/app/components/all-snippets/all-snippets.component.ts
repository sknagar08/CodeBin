import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-all-snippets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-snippets.component.html',
  styleUrl: './all-snippets.component.css'
})
export class AllSnippetsComponent {
  items: any[] = [];
  constructor(private dbService: DbService, private authService: AuthService) {
  }
  
  ngOnInit() {
    this.dbService.getAllCodeSnippets().then(data => {
      this.items = data.filter(data => data.by == this.authService.getUid())
      console.log(this.items);
    });
  }
}
