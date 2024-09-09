import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, NgFor, CommonModule],
  providers: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  constructor(private apiService: ApiService) { }
  
  ACTIVE_USER = sessionStorage.getItem("username") || undefined;

  userPosts: {content: string, user: string}[] = [];

  ngOnInit(): void {
    this.getUserPosts();
    console.log(this.userPosts)
  }


  getUserPosts(){
    this.apiService.getPosts().subscribe(response => {
      this.userPosts = response.data.filter((post:{content: string, user: string}) => post.user === this.ACTIVE_USER)
    })
  }




}
