import { AuthorService } from './author.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public isSignedInStream: Observable<boolean>;
  public displayName: string;
  public photoUrl: string;
  public _currentUsersUid: string;
//  private _isSignedIn: boolean;

  constructor(private afAuth: AngularFireAuth, private AuthorService: AuthorService, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('User is Signin as ', user);
        this.displayName = user.displayName;
        this.photoUrl = user.photoURL;
        this._currentUsersUid = user.uid;
        // this._isSignedIn = true;
      } else {
        console.log('User is not Signin in ');
        // this._isSignedIn = false;
        this.displayName = '';
        this.photoUrl = '';
        this._currentUsersUid = '';
      }
    });
    this.isSignedInStream = this.afAuth.authState.map<firebase.User, boolean>((user: firebase.User) => {
      return user != null;
    }) ; 
  }

  // get IsSigned():boolean{
  //   return this._isSignedIn;
  // }

    get currentId(): string{
      return this._currentUsersUid;
    }

  signInWithGoogle(): void{
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result: any) => {
      this.router.navigate(['/']);
      const user: firebase.User = result.user; 
      console.log('Push the user to the database', user);
      this.AuthorService.updateAuthor(user.uid, user.displayName, user.photoURL);
    });
  }

  signOut(): void{
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }

}
