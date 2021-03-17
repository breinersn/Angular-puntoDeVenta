import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { IUser } from '../../interfaces/usuario';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsn-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: IUser = {
    displayName: '',
    email: '',
    password: ''
  };

  hide = true;

  addressForm = this.fb.group({
    displayName: [null, Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ])
    ],
    email: [null, Validators.compose([
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
    ])
    ],
    password: [null, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ])
    ]
  });

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  registro() {

      this.auth.registro(this.user.displayName, this.user.email, this.user.password).then(console.log);

  }

}
