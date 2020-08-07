import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Post } from '../../data/models/post';
import { Observable } from 'rxjs';
import { DataService } from '../../data/data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    description: new FormControl(''),
  });
  item$: Observable<Post | undefined> = this.route.params.pipe(
    map((params) => params.id),
    tap((id) => {
      this.itemId = id;
    }),
    switchMap((id) => this.service.loadPost(id)),
    tap((post) => {
      if (post) {
        this.form.patchValue(post);
      }
    })
  );
  private itemId: string | null = null;

  constructor(public route: ActivatedRoute, public service: DataService) {}

  ngOnInit(): void {}

  savePost(): void {
    if (!this.itemId) {
      return;
    }
    this.service.updatePost(this.itemId, this.form.value).subscribe((res) => {
      console.log(res);
    });
  }
}
