import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ApiService, AuthService, AuthGuard]
})
export class LoginComponent  {

  back_data: any[] = []
  loginData: any;
  username = '';
  password = '';
  active_user: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private authGuard: AuthGuard) {}


// not only sending, but receiving data
  sendData() {
    const data = [this.username, this.password];
    this.apiService.sendData(data).subscribe(response => {
      console.log('Response from server: ', response, ' for user: ', this.username);
      this.back_data = response;
      console.log(this.back_data)
      this.active_user = this.username;
      if (response){
        sessionStorage.setItem("username", this.active_user)
        this.authService.login()
        this.authService.isLoggedIn()
      }
      console.log(this.active_user)
    });
  }
}
