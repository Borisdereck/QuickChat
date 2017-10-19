import { Post } from './../../model/post';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['../../shared/common.scss','./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  public postBodyText: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onsubmit(): void{
    try {
      const post = new Post({
        body: this.postBodyText,
        autherKey: this.authService._currentUsersUid,
      });
      console.log('TODO: ',post);   
      this.postBodyText = '';

    } catch (error) {
      console.log('submit fail', error);
    }
  }
}
