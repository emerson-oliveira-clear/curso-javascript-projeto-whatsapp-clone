 import { Firebase } from './../utils/Firebase';
 import { ClassEvent } from '../utils/ClassEvent';


export class User extends ClassEvent {

    constructor(id){

        super()

        this._data = {};

        if(id) this.getById(id);

    }

    getById(id){

        return new Promise((s,f) =>{

            User.findByEmail(id).get().then(doc =>{

                this.fromJSON(doc.data());

            })

        })


    }

    static getRef(){

        return Firebase.db().collection('/users');

    }

    static findByEmail(email){

        return User.getRef().doc(email)

    }

}