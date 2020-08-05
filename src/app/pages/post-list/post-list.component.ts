import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs';
import { Post } from '../../data/models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  items$: Observable<Post[]>;

  constructor(private service: DataService) {
    this.items$ = this.service.posts$;
  }

  ngOnInit(): void {}
}
