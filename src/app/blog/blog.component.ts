import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf, ReversePipe, MatCardModule],
  providers: [ApiService],
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
    this.apiService.getPosts().subscribe(response => {
      this.posts = response.data;
      
    }, error => {
      console.error('Error fetching posts', error);
    }); 
  }
}
