import { AuthorService } from './services/author.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdButtonModule, MatChipsModule ,MdToolbarModule, MdListModule, MdInputModule, MdIconModule, MatSidenavModule, MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

// Services
import { AuthService } from './services/auth.service';
import { AuthguardService } from "./services/authguard.service";
import { PostService } from './services/post.service';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { MypostsComponent } from './myposts/myposts.component';
import { SigninComponent } from './signin/signin.component';

import { AppRoutingModule } from "./app-routing.module";
import { CreatepostComponent } from './services/createpost/createpost.component';
import { PostlistComponent } from './services/postlist/postlist.component';
import { PostComponent } from './services/post/post.component';

// pipes
import { ReversePipe } from "./pipes/reverse.pipe";



export const firebaseConfig = {
  apiKey: "AIzaSyArsiCgzbgDVGYXJAjC68iDuyKNo855IiM",
  authDomain: "quick-chat-5737d.firebaseapp.com",
  databaseURL: "https://quick-chat-5737d.firebaseio.com",
  projectId: "quick-chat-5737d",
  storageBucket: "quick-chat-5737d.appspot.com",
  messagingSenderId: "257869878276"
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MypostsComponent,
    SigninComponent,
    CreatepostComponent,
    PostlistComponent,
    PostComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MatSelectModule,
    FormsModule,
    MdIconModule,
    MatSidenavModule,
    RouterModule,
    MdListModule,
    FlexLayoutModule,
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule
     

  ],
  providers: [AuthService, 
    AuthguardService, 
    PostService,
    AuthorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
