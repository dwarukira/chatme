import React, { useState, useEffect } from "react"
import firebase from "firebase"
import ReactLoading from "react-loading"
import { NODE_USERS, ID, NICKNAME, PHOTO_URL, ABOUT_ME } from "../../constants";
import { Firebase, Firestore } from "../../config"
import { withRouter } from "react-router";
import { Landing } from "../landing";

const Login = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() =>{
        checkLogin()
    }, [])
    const checkLogin = () => {
        if(localStorage.getItem(ID)) {
            setLoading(false)
            history.push('/d')
        }
    }

    const onLoginPress = () => {
        setLoading(true)
        Firebase.auth().signInWithPopup(provider).then(async result => {
            let user: any = result.user

            if (user) {
                let result = await Firestore
                    .collection(NODE_USERS)
                    .where(ID, '==', user.uid)
                    .get()

                if (result.docs.length === 0) {
                    console.log("Okat");
                    
                    // create new user
                    Firestore.
                        collection('users')
                        .doc(user.uid)
                        .set({
                            id: user.uid,
                            nickname: user.displayName,
                            aboutMe: '',
                            photoUrl: user.photoURL
                        }).then(data => {

                            // Write user info to local
                            localStorage.setItem(ID, user.uid)
                            localStorage.setItem(NICKNAME, user.displayName)
                            localStorage.setItem(PHOTO_URL, user.photoURL)
                            setLoading(false)
                            history.push("/d")
                        })
                } else {
                    localStorage.setItem(ID, result.docs[0].data().id)
                        localStorage.setItem(
                            NICKNAME,
                            result.docs[0].data().nickname
                        )
                        localStorage.setItem(
                            PHOTO_URL,
                            result.docs[0].data().photoUrl
                        )
                        localStorage.setItem(
                            ABOUT_ME,
                            result.docs[0].data().aboutMe
                        )
                        setLoading(false)
                        history.push('/d')
                        
                }
            } else {
                console.log(result, "here");
                // localStorage.setItem(ID, result.)

                setLoading(false)

            }
        }).catch((error) => {
            setLoading(false)
            console.log(error);

        })

    }
    return (
        <div>
           

            <Landing onClick={onLoginPress} />

            {
               loading ?  <ReactLoading
                 type={'spin'}
                 color={'#203152'}
                 height={'3%'}
                 width={'3%'}
             /> : ''
            }
        </div>
    )
}


export default withRouter(Login)