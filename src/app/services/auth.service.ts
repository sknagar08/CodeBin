import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid?: string;

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        localStorage.setItem('curUser', this.uid);
        console.log('Current user: ', user.email);
      } else {
        this.uid = undefined
        console.log('Logged out');
      }
    });
  }

  isLoggedIn(){
    return this.getUid() ? true : false;
  }

  getUid(){
    return localStorage.getItem('curUser');
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something went wrong!");
        // ..
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something went wrong while login!");
      });
  }

  logoutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('curUser');
      this.router.navigate(['login']);
    }).catch((error) => {
      alert("Something went wrong while logout!")
    });
  }
}
