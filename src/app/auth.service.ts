import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { from, Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.User | null = null;
  isLoggedIn = false;

  constructor(private readonly afa: AngularFireAuth) {
    this.afa.authState.subscribe((res) => {
      console.log(res);
      this.user = res;
      this.isLoggedIn = !!this.user;
    });
  }

  login(
    email: string,
    password: string
  ): Observable<ObservedValueOf<Promise<firebase.auth.UserCredential>>> {
    return from(this.afa.signInWithEmailAndPassword(email, password));
  }

  register(
    email: string,
    password: string
  ): Observable<ObservedValueOf<Promise<firebase.auth.UserCredential>>> {
    return from(this.afa.createUserWithEmailAndPassword(email, password));
  }

  loginGoogle(): Observable<
    ObservedValueOf<Promise<firebase.auth.UserCredential>>
  > {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afa.signInWithPopup(provider));
  }

  logout(): Observable<ObservedValueOf<Promise<void>>> {
    return from(this.afa.signOut());
  }
}
