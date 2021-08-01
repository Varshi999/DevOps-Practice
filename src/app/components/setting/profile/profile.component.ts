import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user_name;
  public user_email;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserData().subscribe(data => {
      this.user_name = data.user_name;
      this.user_email = data.user_email;
    })
  }
}
