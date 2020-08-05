import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { collectionData, docData, fromCollectionRef } from 'rxfire/firestore';
import { Post } from './models/post';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();
  postsCollection$: Observable<Post[]>;

  collectionRef: AngularFirestoreCollection<Post[]>;

  constructor(private firestore: AngularFirestore) {
    this.collectionRef = this.firestore.collection('posts');
    this.postsCollection$ = collectionData<Post>(this.collectionRef.ref, 'id');
  }

  loadPosts() {
    return this.postsCollection$.pipe(
      tap((res) => {
        this.postsSubject.next(res);
      })
    );
  }
  loadPost(id: string) {
    return of(this.postsSubject.getValue().find((post) => post.id === id));
  }

  updatePost(itemId: string, post: Post) {
    return from(this.collectionRef.doc(itemId).update(post));
  }
}
