import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Author } from './../model/author';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorService {
  readonly authorPath = 'authors';
  public authorMapStream: FirebaseObjectObservable<Map<string, Author>>;

  constructor(private db: AngularFireDatabase) { 
    this.authorMapStream = this.db.object(this.authorPath);
  }

  updateAuthor(authorKey: string, displayName: string, photoUrl: string) {
    const author = new Author({
      displayName: displayName,
      photoUrl: photoUrl
    });
    this.db.object(`/${this.authorPath}/${authorKey}`).set(author);

  }
}
