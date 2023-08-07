import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.custom';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login() {
    window.location.href = environment.apiAdress + 'user/discord';
  }
}
