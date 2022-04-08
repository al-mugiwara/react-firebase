import firebaseConfig, { database } from '../../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { push, ref, set,onValue } from "firebase/database";


export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "ko" })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
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
                    refreshToken: userCredential.user.refreshToken,
                    uid: userCredential.user.uid
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

export const addDataToAPI = (data) => (dispatch) => {

    push(ref(database, 'notes/' + data.userId), {
        title   : data.title,
        content : data.content,
        date    : data.date
    });

    // database.push(database.ref(database,'notes/' + data.userId),{
    //     title: data.title,
    //     content:data.content,
    //     date:data.date
    // })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const urlNotes = ref(database, 'notes/' + userId);
    return new Promise ((resolve,reject) => {
        onValue(urlNotes, (snapshot) => {
            console.log('getData: ' ,snapshot.val())
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id      : key,
                    data    : snapshot.val()[key]
                })
            }) //untuk membuat object menjadi array
            dispatch({ type: "SET_NOTES", value: data })
            resolve(snapshot.val())
          });
    })
   
      
}