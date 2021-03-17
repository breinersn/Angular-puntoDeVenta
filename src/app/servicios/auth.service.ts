import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './usuario.service';
import { IUser } from '../interfaces/usuario';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';


@Injectable()

export class AuthService {

    constructor(private AfAuth: AngularFireAuth, private userS: UserService,
                private router: Router) {
    }

    getUser(): Observable<IUser> {

        return this.AfAuth.authState.map((user: firebase.User) => user as IUser).take(1).filter((user: firebase.User) => !!user);
    }

    login(email: string, password: string): Promise<void> {

        return  this.AfAuth.auth.signInWithEmailAndPassword( email, password).then(resp => {
            if(resp) {
                this.router.navigate(['/comp/home']);
            }
        }).catch(err => alert('Usuario y contraseña incorrectos'));
    }

    registro(usuario: string, email: string, pass: string): Promise<any> {

        return this.AfAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then( result => {

            if (result.user.email) {
                this.router.navigate(['/comp/home']);

                return this.userS.add({
                    displayName: usuario,
                    uid: result.user.uid,
                    email: result.user.email,
                    emailVerified: result.user.emailVerified,
                    password: pass,
                    rol: 'empleado'
                });
            }
        });
    }

    loginAuthGoogle(): Promise<void> {
        return this.AfAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then();
    }

    loginAuthFacebook(): Promise<void> {
        return this.AfAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then();
    }
}
