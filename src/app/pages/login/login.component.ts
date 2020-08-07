import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {}

  loginGoogle(): void {
    this.service.loginGoogle().subscribe((res) => {
      console.log(res);
      return this.router.navigate(['/']);
    });
  }
}
