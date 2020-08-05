import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [CommonModule, PostDetailRoutingModule, ReactiveFormsModule],
})
export class PostDetailModule {}
