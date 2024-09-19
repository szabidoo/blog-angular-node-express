import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../api.service';
import { ReversePipe } from './reverse.pipe';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf, ReversePipe, MatCardModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  active_user = sessionStorage.getItem("username")
  postAuthor = ''
  posts: {content: string, user: string}[] = [];

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
   this.getPosts() 
  }

  getPosts() {
    this.apiService.getPosts$().subscribe(response => {
      this.posts = response.data;
      
    }, error => {
      console.error('Error fetching posts', error);
    }); 
  }
}
