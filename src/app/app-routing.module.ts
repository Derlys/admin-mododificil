import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { PostsResolver } from './data/resolvers/posts.resolver';

const routes: Routes = [
  {
    path: '',
    // If this path is the 'full' match...
    pathMatch: 'full',
    // ...redirect to this route.
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  // The other routes go here
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Here we will add our application pages
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'posts',
        resolve: {
          posts: PostsResolver,
        },
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/post-list/post-list.module').then(
                (m) => m.PostListModule
              ),
          },
          {
            path: ':id',
            loadChildren: () =>
              import('./pages/post-detail/post-detail.module').then(
                (m) => m.PostDetailModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
