import { AngularFireDatabase } from 'angularfire2/database';
import { Author } from './../model/author';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorService {
  readonly authorPath = 'authors';

  constructor(private db: AngularFireDatabase) { }

  updateAuthor(authorKey: string, displayName: string, photoUrl: string) {
    const author = new Author({
      displayName: displayName,
      photoUrl: photoUrl
    });
    this.db.object(`/${this.authorPath}/${authorKey}`).set(author);

  }
}
