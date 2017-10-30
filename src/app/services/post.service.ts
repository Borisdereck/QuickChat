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
import { Query } from 'angularfire2/database/interfaces';

@Injectable()
export class PostService {
  readonly postPath = 'Posts';
  public postBatchSize = 5;
  private _postsStream: FirebaseListObservable<Post[]>;
  // items: Observable<any[]>;
  postWhitAuthorStream: Observable<PostWithAuthor[]>;
  private postIncrementSteam: Subject<number>;
  public isMyPostPageStream: Subject<boolean>;

  public hideLoadMoreBtn = false;

  constructor(private db: AngularFireDatabase,
    public AuthService: AuthService,
    private authorService: AuthorService) {

    this.postIncrementSteam = new BehaviorSubject<number>(this.postBatchSize);
    this.isMyPostPageStream = new BehaviorSubject<boolean>(false);
    const numPostStream: Observable<number> = this.postIncrementSteam
      .scan<number>((previousTotal: number, currentValue: number) => {
        return previousTotal + currentValue;
      });

    const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      numPostStream,
      this.isMyPostPageStream,
      (numPost: number, isMyPostPage: boolean) => {
        if (isMyPostPage) {
          return {
            orderByChild: 'autherKey',
            equalTo: this.AuthService.currentId,

          }
        } else {
          return {
            limitToLast: numPost,
          }
        }
      }
    );

    const postStream: Observable<Post[]> = queryStream
      .switchMap<Query, Post[]>((queryParameter: Query) => {
        return this.db.list(this.postPath, {
          query: queryParameter
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
      numPostStream,
      (posts: Post[], authorMap: Map<string, Author[]>, numPostsRequested: number) => {
        const postsWhitAuthor: PostWithAuthor[] = [];
        this.hideLoadMoreBtn = numPostsRequested > posts.length;
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

  remove(keyToRemove: string): void {
    this.db.object(`/${this.postPath}/${keyToRemove}`).remove();
    // firebase.database().ref(`/${this.postPath}/${keyToRemove}`).remove();
    // firebase.database().ref().child(this.postPath).child(keyToRemove).remove();   
  }

  displayMorePost() {
    this.postIncrementSteam.next(this.postBatchSize);
  }

  update(key: string, post: Post) {
    firebase.database().ref(`/${this.postPath}/${key}`).set(post);
    // this.db.object(`/${this.postPath}/${key}`).set();
  }

  showOnlyMyPost(isMyPpostPage: boolean): void {
    this.isMyPostPageStream.next(isMyPpostPage);
  }


}