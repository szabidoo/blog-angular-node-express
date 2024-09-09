import { Component, ViewChild, ElementRef } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { NgFor, NgIf, CommonModule } from '@angular/common'; // Import CommonModule
import { ApiService } from '../api.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogComponent, NgFor, NgIf, CommonModule, MatInputModule, MatButtonModule, MatDividerModule, FormsModule], // Add CommonModule to imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BlogComponent],
  animations: [
    trigger('postAreaState', [
      state('hidden', style({
        width: '0',
        opacity: 0
      })),
      state('visible', style({
        width: '100%',
        opacity: 1
      })),
      transition('hidden => visible', [
        animate('0.5s ease')
      ]),
      transition('visible => hidden', [
        animate('0.5s ease')
      ])
    ])
  ]
})
export class HomeComponent {

  @ViewChild(BlogComponent) blogComponent!: BlogComponent;
  @ViewChild('addPostArea') addPostArea!: ElementRef; // Reference to the textarea

  constructor(private apiService: ApiService) { }

  isLoggedIn: boolean = false;
  isEditing: boolean = false;
  isPostAreaVisible: boolean = false;
  postContent: string = '';

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  showPostArea() {
    if (!this.isPostAreaVisible) {
      this.isPostAreaVisible = true;
      setTimeout(() => {
        this.addPostArea.nativeElement.focus(); // Focus the textarea
      }, 200);
    }
  }

  submitPost(event: Event) {
    event.stopPropagation();
    this.createPost();
    this.postContent = '';
    this.isPostAreaVisible = false;
  }

  createPost() {
    if (this.postContent === undefined || this.postContent === null || this.postContent.trim() === '') {
      console.log('Not postable');
      return;
    }

    this.apiService.createPost(this.postContent).subscribe({
      next: (response) => {
        console.log('Post added!');
        console.log(response);
        this.blogComponent.getPosts(); // Refresh BlogComponent
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
  }
}