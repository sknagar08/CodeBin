import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {
  codeSnippet: any = { title: '', codeSnippet: '' };
  constructor(private route: ActivatedRoute, private dbService: DbService) { }
  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    console.log(docId);
    this.dbService.getSnippetById(docId!).then((data: any) => this.codeSnippet = data);
  }

  copyToClipboard(btn: HTMLButtonElement) {
    const code = this.codeSnippet.codeSnippet;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied';
      btn.disabled = true;
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
