import { Component, ViewChild} from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [BlogComponent]
})
export class HomeComponent {

  @ViewChild(BlogComponent) blogComponent!: BlogComponent;

  constructor(private apiService: ApiService) {  }

  isLoggedIn: boolean = false;

  isEditing: boolean = false;



  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  changeDivContent() {
    const div = document.getElementById('newpost');
    if (div) {
      div.addEventListener('click', () => {
        if (!div.innerHTML.includes('addPostArea')) {
          div.innerHTML = `<textarea id="addPostArea" rows="10" cols="100" spellcheck="false" placeholder="Write your post here"></textarea>
          <button id="submit">Submit</button>`;
          div.style.transition = 'all 0.5s ease';
          div.style.width = '100%';
          const addPostArea = document.getElementById('addPostArea') as HTMLTextAreaElement;
          addPostArea.focus();
          addPostArea.style.fontFamily = 'Arial, sans-serif';
  
          const submitButton = document.getElementById('submit') as HTMLButtonElement;
          if (submitButton) {
            submitButton.addEventListener('click', (event) => {
              event.stopPropagation();
              this.createPost();
              addPostArea.value = '';
            });
          }
        }
      });
    }
  }

  createPost() {
    const addPostArea = document.getElementById('addPostArea') as HTMLTextAreaElement;

    if (!addPostArea) {
      console.error('Add Post Area not found');
      return;
    }
    const post = addPostArea.value;
    console.log(post);
    if (post === undefined || post === null) {
      console.log('Not postable');
    } else {
      this.apiService.createPost(post).subscribe({
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
}