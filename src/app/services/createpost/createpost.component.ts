import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['../../shared/common.scss','./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
