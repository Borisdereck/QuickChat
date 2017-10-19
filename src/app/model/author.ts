import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';
export class Author extends FirebaseFlatSnapshot{
  public diplayName: string;
  public photoUrl: string;

  constructor(obj?: any){
    super(obj);
    this.diplayName = obj && obj.displayName  || "";
    this.photoUrl = obj && obj.photoUrl || "";
  }
}
