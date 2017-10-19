import { Component, OnInit } from '@angular/core';
// import { MdCardModule, MdButtonModule, MdToolbarModule, MdInputModule, MdIconModule, MatSidenavModule } from '@angular/material';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'amte-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amte';

  constructor(public AuthService: AuthService){}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  
}
