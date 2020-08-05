import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver implements Resolve<Post[]> {
  constructor(private service: DataService) {}
  resolve(): Observable<Post[]> {
    return this.service.loadPosts().pipe(take(1));
  }
}
