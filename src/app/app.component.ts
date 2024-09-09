import { Component, HostListener } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
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
    RouterModule,
    MatSlideToggleModule,
    MatIconModule,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService, AuthService] // Ensure ApiService and AuthService are provided here
})
export class AppComponent implements OnInit {
  title = 'blog';
  data: any;
  loginState$: Observable<boolean>;
  isNavbarExpanded: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.loginState$ = this.authService.isLoggedIn();
  
}

ngOnInit() {
  console.log(this.loginState$, " loginstate")
  this.apiService.loginState().subscribe(response => {
    if(response.data === false){
      console.log(response)
      this.router.navigate(['/login'])
    }
    else{ this.authService.login()}
    console.log(response)
  })
}

@HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInsideNavbar = target.closest('.navbar') !== null;
    const clickedNavbarItem = target.closest('.navbar ul li') !== null;
    if (!clickedInsideNavbar || clickedNavbarItem) {
      this.isNavbarExpanded = false;
    }
  }

toggleNavbar() {
  this.isNavbarExpanded = !this.isNavbarExpanded;
}


  logout() {
    console.log("Logout() called")
    this.apiService.logout().subscribe(response => {
      console.log("Logout response: ", response)
    })
    this.router.navigate(['/login'])
    this.authService.logout()
  }
}