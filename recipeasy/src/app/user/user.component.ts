import { Component, Input, OnInit } from '@angular/core';
import { User } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userCard: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  banUser(): void{

  }

}
