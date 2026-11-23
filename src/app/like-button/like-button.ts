import { Component } from '@angular/core';

@Component({
  selector: 'app-like-button',
  imports: [],
  templateUrl: './like-button.html',
  styleUrl: './like-button.css',
})
export class LikeButton {
  likes = 0;
  liked = false;
  
  toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
  }

}
