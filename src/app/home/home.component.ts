import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isEditing: boolean = false

  toggleEditing() {
    this.isEditing = !this.isEditing
  }
  
  

}
