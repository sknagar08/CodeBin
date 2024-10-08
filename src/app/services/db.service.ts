import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { CodeSnippet } from '../../models/CodeSnippet';
import { Router } from '@angular/router';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: any;
  constructor(private authService: AuthService, private router: Router) {
    this.db = getFirestore();
  }

  async createCodeSnippet(snippet: CodeSnippet) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authService.getUid()
      });
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(['/snippets'])
    } catch (e) {
      console.error("Error adding snippet: ", e);
      alert("Something went wrong!")
    }
  }

  async getAllCodeSnippets() {
    let snippets: any[] = [];
    try {
      const querySnapshot = await getDocs(collection(this.db, "snippets"));
      querySnapshot.forEach((doc) => {
        snippets.push({ id: doc.id, ...doc.data() })
      });
    } catch (e) {
      console.error("Error reading snippets: ", e);
      alert("Something went wrong!")
    }

    return snippets;
  }

  async getSnippetById(docId: string) {

    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return { id: '', title: '', codeSnippet: '' };
    }
  }

}
