import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IUser } from '../interfaces/usuario';

@Injectable()

    export class UserService {

        private users: AngularFirestoreCollection<IUser>;

        constructor(private afs: AngularFirestore) {

            this.users = this.afs.collection<IUser>('users');
        }

        add(user: IUser): Promise<void> {
            return this.users.doc(user.uid).set(user).catch();
        }
    }
