import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { PostService } from './../post.service';
import { Post } from './../../model/post';
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

  @Input() post: Post;
  public editingMode = EditMode.displayEditButton;

  constructor(public authService: AuthService,
    public PostService: PostService,
    public firebase: AngularFireDatabase,
    public snackBar: MdSnackBar
  ) {

  }

  ngOnInit() {
  }

  enableEditing() {
    console.log("Enable activate.!!");
  }

  remove(autherKey): void {
     let undo: boolean = false ;
    console.log("Delete: Done.!!");
    this.PostService.remove(autherKey);
    const snackRef = this.snackBar.open("Post Removed", "UNDO", {
      duration: 3000,
    });

    snackRef.onAction().subscribe(() => {      
      console.log("User CLicked in UNDO");
      this.snackBar.open("Post Restored", "", {
        duration: 3000,
      });
      
    });

    
     
    
  }

}
