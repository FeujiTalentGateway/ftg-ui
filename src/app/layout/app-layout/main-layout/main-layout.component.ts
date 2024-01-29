import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  userData:User = new User()
  

  

  userObject: User = {
  id_i: 1,
  userName: 'exampleUser',
  emailId: 'example@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password123',
  created_at_ts: new Date(),
  updated_at_ts: new Date(),
  updated_by_i: 1,
  is_active_sw: true,
  roles_list_: 1,
};



}
