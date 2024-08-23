import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [ApiService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  constructor(private apiService: ApiService) {}

 posts: string[] = []

  ngOnInit(): void {
   this.getPosts() 
    
  }
  
  getPosts() {
    this.apiService.getPosts().subscribe(response => {
      console.log('GETPOSTS DATA IS: ', response);
      this.posts = response.data;
      console.log(this.posts)
      
      
    }, error => {
      console.error('Error fetching posts', error);
    });
  }
  

}
