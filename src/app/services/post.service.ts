import { AngularFireDatabase, AngularFireList    } from 'angularfire2/database';
import { Post } from './../model/post';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  readonly postPath = 'Posts';
  private _postsStream: AngularFireList<Post>;

  constructor(private db: AngularFireDatabase) {
    this._postsStream =  this.db.list(this.postPath);
   }
  
  add(post: Post){
    console.log('Pushing the post ', post );
    this._postsStream.push(post);
  }


}
