import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { CodeSnippet } from '../../../models/CodeSnippet';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css'
})
export class CreateBinComponent {

  constructor(private dbService: DbService){}

  title = new FormControl("", [Validators.required])
  codeSnippet = new FormControl("", [Validators.required])

  binForm = new FormGroup({
    title: this.title,
    codeSnippet: this.codeSnippet
  })

  async save() {
    await this.dbService.createCodeSnippet(this.binForm.value as CodeSnippet);
  }
}
