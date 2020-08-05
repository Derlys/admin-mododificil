import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // @ts-ignore
  user: firebase.User | null;
  // @ts-ignore
  isLoggedIn: boolean;

  constructor(private readonly afa: AngularFireAuth) {
    this.afa.authState.subscribe((res) => {
      console.log(res);
      this.user = res;
      this.isLoggedIn = !!this.user;
    });
  }

  login(email: string, password: string) {
    return from(this.afa.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string) {
    return from(this.afa.createUserWithEmailAndPassword(email, password));
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afa.signInWithPopup(provider));
  }

  loginGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    return from(this.afa.signInWithPopup(provider));
  }

  logout() {
    return from(this.afa.signOut());
  }
}
