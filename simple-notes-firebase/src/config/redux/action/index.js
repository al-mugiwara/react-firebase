import firebaseConfig, { database } from '../../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from 'firebase/database';



export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "ko" })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {

    return new Promise((resolve,reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        const auth = getAuth();
        return (
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log('success    : ', userCredential);
                    dispatch({ type: "CHANGE_LOADING", value: false })
                    resolve(true)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    dispatch({ type: "CHANGE_LOADING", value: false })
                    reject(false)
                    // ..
                })
        )
    })

}

export const LoginUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const dataUser = {
                    email: userCredential.user.email,
                    password: userCredential.user.uid,
                    emailVerified: userCredential.user.emailVerified,
                    refreshToken    : userCredential.user.refreshToken,
                    uid             : userCredential.user.uid
                }
                // Signed in 
                 const user = userCredential.user;
                console.log('success    : ', user);
                dispatch({ type: "CHANGE_ISLOGIN", value: false })
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_USER", value: dataUser })
                resolve(dataUser)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_ISLOGIN", value: false })
                reject(false)
            })
    })


}

export const addDataToAPI = (data)  => (dispatch) => {
    
    database.push(database.ref(database,'notes/' + data.userId),{
        title: data.title,
        content:data.content,
        date:data.date
    })
}