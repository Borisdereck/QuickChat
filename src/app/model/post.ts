import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';

export class Post extends FirebaseFlatSnapshot {
  
  public autherKey: string;
  public body: string;
  public name: string;
  public photo: string;

  constructor(obj?: any) {
    super(obj);
    this.autherKey = obj && obj.autherKey || "";
    this.body = obj && obj.body || "";
    this.name = obj && obj.name || "";
    this.photo = obj && obj.photo || "";
  }
  
}
