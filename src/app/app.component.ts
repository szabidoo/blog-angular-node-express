import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { routes } from './app.routes';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    LoginComponent,
    HomeComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService] // Ensure ApiService and AuthService are provided here
})
export class AppComponent implements OnInit {
  title = 'blog';
  data: any;

  ngOnInit(): void {
    this.apiService.getLoginState()
  }

  loginState$: Observable<boolean>;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.router.resetConfig(routes)
    this.loginState$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    sessionStorage.removeItem("username");
    this.router.navigate(['/login']);
  }
}