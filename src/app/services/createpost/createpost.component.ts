import { PostService } from './../post.service';
import { Post } from './../../model/post';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['../../shared/common.scss', './createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  public postBodyText: string;


  constructor(public authService: AuthService, private PostService: PostService) { }

  ngOnInit() {
  }

  onsubmit(): void {
    // Nombre Corto para el label del author
    // let nameShort: string[] = this.authService.displayName.split(" ", 1);

    try {
      const post = new Post({
        body: this.postBodyText,
        autherKey: this.authService._currentUsersUid,
        name: this.authService.displayName,
        photo: this.authService.photoUrl
      });
      // console.log('TODO: ',post);   
      this.PostService.add(post);
      this.postBodyText = '';

    } catch (error) {
      console.log('submit fail', error);
    }
  }
}
