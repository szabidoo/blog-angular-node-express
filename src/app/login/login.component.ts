import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, MatFormFieldModule,MatIconModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ApiService],
})
export class LoginComponent {


  back_data: any[] = []
  loginData: any;
  username = '';
  password = '';
  active_user: string = '';



  constructor(private apiService: ApiService, private authService: AuthService) {}


// not only sending, but receiving data
  login() {
    const data = [this.username, this.password];
    this.apiService.loginData(data).subscribe(response => {
      
      this.back_data = response;
      console.log(this.back_data)
      this.active_user = this.username;
      if (response){
        sessionStorage.setItem("username", this.active_user)
        this.authService.login();
      }
    });
  }

  registerUser() {
    const data = [this.username, this.password];
    this.apiService.registerUser(data).subscribe(response => {
      
      this.back_data = response
      console.log(this.back_data)
    })
  }


}
