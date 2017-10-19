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
