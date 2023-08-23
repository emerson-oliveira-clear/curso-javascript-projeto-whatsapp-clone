import firebase from 'firebase';

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyB0zFIjcPEYwz-7zC7Bat27hppCQuA82EE",
            authDomain: "whatsappclone-75160.firebaseapp.com",
            projectId: "whatsappclone-75160",
            storageBucket: "whatsappclone-75160.appspot.com",
            messagingSenderId: "1062599529537",
            appId: "1:1062599529537:web:7b5652bf3713becd21e2c0",
            measurementId: "G-DWS3L0R1C6"
          };

        this.init();

    }

    init(){

        

        if(!window._initalizedFirebase){
            firebase.initializeApp(this._config)
            firebase.firestore().settings({
                timeStampsInSnapshots: true
            })
            window._initalizedFirebase = true
        }
    }
    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s,f) =>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(result=>{
                let token = result.credential.accessToken;
                let user  = result.user;
                s({
                    user,
                    token
                });
            }).catch(err => {
                f(err)
            })
        })
    }



}


