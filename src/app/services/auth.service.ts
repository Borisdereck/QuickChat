import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public isSignedInStream: Observable<boolean>
//  private _isSignedIn: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('User is Signin as ', user);
        // this._isSignedIn = true;
      } else {
        console.log('User is not Signin in ');
        // this._isSignedIn = false;
      }
    });
    this.isSignedInStream = this.afAuth.authState.map<firebase.User, boolean>((user: firebase.User) => {
      return user != null;
    }) ; 
  }

  // get IsSigned():boolean{
  //   return this._isSignedIn;
  // }

  signInWithGoogle(): void{
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user: firebase.User) => {
      this.router.navigate(['/'])
    });
  }

  signOut(): void{
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);

  }

}
