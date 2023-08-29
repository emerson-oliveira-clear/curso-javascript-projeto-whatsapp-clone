import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";

export class User extends Model{


    constructor(id){

        super();

        if(id) this.getById(id);
        
    }


    get name(){return this._data.name;}
    set name(value){ this._data.name = value}
    
    get email(){return this._data.email;}
    set email(value){ this._data.email = value}

    get photo(){return this._data.photo;}
    set photo(value){ this._data.photo = value}

    get chatId(){return this._data.chatId;}
    set chatId(value){ this._data.chatId = value}

    getById(id){
        return new Promise((s,f)=>{
           
            User.findByEmail(id).onSnapshot(doc=>{
                           
                this.fromJSON(doc.data())

                s(doc)
            })
            


        })
    }

    save(){

        return User.findByEmail(this.email).set(this.toJSON());
    }

    static getRef(){

        return Firebase.db().collection('/users');
    }

    static findByEmail(email){
       // console.log('email:::', email)
        return User.getRef().doc(email);
    }

    /** 
    *Adds a contact to firebase
    */
    addContact(contact){
        //add a contact to firebase
        return User.getContactsRef(this.email)
                .doc(btoa(contact.email))
                .set(contact.toJSON())
    }

    static getContactsRef(id){

        return User.getRef()
                .doc(id)
                .collection('/contacts');
    }

    updateLastMessage(filter = "", selectedContactEmail){
        return new Promise((s,f)=>{
            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs=>{
                console.log('DOCS::::', docs)

                docs.forEach(doc=>{
                    
                    let data = doc.data()
                    let id = doc.id

                    if(data.email === selectedContactEmail){
                        s({data, id})
                    }

                })
            })
        })
    }
   

    getContacts(filter = ''){
        return new Promise((s,f)=>{

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs =>{

                let contacts = [];

                docs.forEach(doc => {
                    //console.log('DOCSSSS OKKKK')
                    let data = doc.data();

                    //console.log('DOCKS AQUI >>', doc)
                    
                    data.id = doc.id;
                    //console.log('DATA>>>', data)
                    contacts.push(data);
                
                })
            
                this.trigger('contactschange', docs);

                //console.log('CONTACTSSSS:', contacts);
                s(contacts);

            })
            

        })
    }

}