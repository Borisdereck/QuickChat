import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { PostService } from './../post.service';
import { Post, PostWithAuthor } from './../../model/post';
import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';


enum EditMode {
  notEditable = 0,
  displayEditButton = 1,
  editing = 2,
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../shared/common.scss', './post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postWhitAuthor: PostWithAuthor;
  editingMode = EditMode.notEditable;
  updatePostBody: string; 

  constructor(public authService: AuthService, public PostService: PostService, public firebase: AngularFireDatabase,
    public snackBar: MdSnackBar
  ) {
    // this.editingMode = EditMode.displayEditButton;
  }

  ngOnInit() {
    if (this.postWhitAuthor.autherKey == this.authService._currentUsersUid) {
      this.editingMode = EditMode.displayEditButton;     
    }
  }

  // Edit Post
  enableEditing(inputEl: HTMLInputElement) {
    console.log("Enable activate.!!");
    this.editingMode = EditMode.editing;
    this.updatePostBody = this.postWhitAuthor.body;
    setTimeout(() =>{
      inputEl.focus();
    },100);
  }

  // Remove PPOst
  remove(autherKey): void {
    let undo: boolean = false;
    console.log("Delete: Done.!!");
    this.PostService.remove(this.postWhitAuthor.$key);

    // Show the SnackBar Post Removed
    const snackRef = this.snackBar.open("Post Removed", "UNDO", {
      duration: 4000,
    });

    // Show the SnackBar Post Restored
    snackRef.onAction().subscribe(() => {
      const restorepost = new Post();
      restorepost.body = this.postWhitAuthor.body;
      restorepost.autherKey = this.authService.currentId;
      this.PostService.update(this.postWhitAuthor.$key, restorepost);
      this.snackBar.open("Post Restored", "", {
        duration: 3000,
      });
    });
  }

  save(): void {
    // console.log("Save the Change to.", this.updatePostBody);
    const updatedPost =new Post();
    updatedPost.body = this.updatePostBody;
    updatedPost.autherKey = this.authService.currentId;
    this.PostService.update(this.postWhitAuthor.$key, updatedPost);
    this.editingMode = EditMode.displayEditButton;
  }

  cancel(): void {
    this.editingMode = EditMode.displayEditButton;
  }

}
