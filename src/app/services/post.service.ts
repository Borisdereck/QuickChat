import { Author } from './../model/author';
import { AuthorService } from './author.service';
import { AuthService } from './auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Post, PostWithAuthor } from './../model/post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/combineLatest";
import 'rxjs/add/operator/scan';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap'

import * as firebase from 'firebase/app';

@Injectable()
export class PostService {
  readonly postPath = 'Posts';
  public postBatchSize = 5;
  private _postsStream: FirebaseListObservable<Post[]>;
  // items: Observable<any[]>;
  postWhitAuthorStream: Observable<PostWithAuthor[]>;
  private postIncrementSteam: Subject<number>;

  constructor(private db: AngularFireDatabase,
    public AuthService: AuthService,
    private authorService: AuthorService) {
    this.postIncrementSteam = new BehaviorSubject<number>(this.postBatchSize);
    const numPostStream: Observable<number> = this.postIncrementSteam
    .scan<number>((previousTotal: number, currentValue: number) => {
      return previousTotal + currentValue;
    })
    
    const postStream: Observable<Post[]> = numPostStream
      .switchMap<number, Post[]>((numPosts: number) => {
        return this.db.list(this.postPath, {
          query: {
            limitToLast: numPosts,
          }
        });
      });
    // this._postsStream = this.db.list(this.postPath, {
    //   query: {
    //     limitToLast: this.postBatchSize
    //   }
    // });

    this.postWhitAuthorStream = Observable.combineLatest<PostWithAuthor[]>(
      postStream,
      this.authorService.authorMapStream,
      (posts: Post[], authorMap: Map<string, Author[]>) => {
        const postsWhitAuthor: PostWithAuthor[] = [];
        for (let post of posts) {
          const postWithAuthor = new PostWithAuthor(post);
          postWithAuthor.author = authorMap[post.autherKey];
          postsWhitAuthor.push(postWithAuthor);
        }
        return postsWhitAuthor;
      });
    // this.items = this._postsStream.valueChanges();
  }

  // get postsStream(): FirebaseListObservable<Post[]>{
  //   return this._postsStream;
  // }

  add(post: Post) {
    // console.log('Pushing the post ', post);
    // this._postsStream.push(post);
    firebase.database().ref().child(this.postPath).push(post);
  }

  remove(itemRemove: string): void {
    itemRemove = "ooajhiv";
    this._postsStream.remove(itemRemove);
    // console.log(itemRemove);
  }

  displayMorePost() {
    this.postIncrementSteam.next(this.postBatchSize);
  }


}