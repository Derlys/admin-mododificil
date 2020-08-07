import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs';
import { Post } from '../../data/models/post';

function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

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

  addPost(): void {
    const title = window.prompt('Enter title');
    if (!title) {
      return;
    }
    console.log(title);
    const id = slugify(title);
    console.log(id);
    this.service.addPost(id, title).subscribe();
  }
}
