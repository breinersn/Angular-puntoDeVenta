import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { IUser } from '../../interfaces/usuario';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bsn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {
    email: '',
    password: '',
  };

  addressForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
    ])
    ],
    password: [null, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ])
    ]
  });

  hide = true;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(console.log);
  }

  login() {

      this.auth.login(this.user.email, this.user.password);

  }

  // tslint:disable-next-line: typedef
  loginGoogle() {
    this.auth.loginAuthGoogle().then();
  }

  // tslint:disable-next-line: typedef
  loginFacebook() {
    this.auth.loginAuthFacebook().then();
  }

}
