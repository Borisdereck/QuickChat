import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from './../model/post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {
  readonly postPath = 'Posts';
  private _postsStream: AngularFireList<Post>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this._postsStream = this.db.list(this.postPath);
    this.items = this._postsStream.valueChanges();
  }

  get postsStream(): AngularFireList<Post>{
    return this._postsStream;
  }

  add(post: Post) {
    console.log('Pushing the post ', post);
    this._postsStream.push(post);
  }


}
