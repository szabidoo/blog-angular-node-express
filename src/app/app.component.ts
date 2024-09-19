import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


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
  /*
    Töröltem a providers tömböt. Ha egy service-nek a dekorátorában szerepel a
    providedIn: 'root', akkor azt mindenféle angular-os képződmény (service, component stb.) lát,
    így felesleges itt külön provide-olni (további magyarázat: app.config.ts-ben).
  */
})
export class AppComponent {
  title = 'blog';
  isNavbarExpanded: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {}

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
    this.authService.logout$().subscribe(response => {
      this.router.navigate(['/login']);
    });
  }
}