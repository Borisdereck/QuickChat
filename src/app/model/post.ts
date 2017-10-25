import { Author } from './author';
import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';

export class Post extends FirebaseFlatSnapshot {
  
  public autherKey: string;
  public body: string;
  

  constructor(obj?: any) {
    super(obj);
    this.autherKey = obj && obj.autherKey || "";
    this.body = obj && obj.body || "";
    
  }
  
}

export class PostWithAuthor extends Post {
  public author: Author;

  constructor(obj?: any) {
    super(obj);
    this.author = obj && obj.author || new Author();
  }
}


