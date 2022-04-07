import firebaseConfig from '../../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "ko" })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({ type: "CHANGE_LOADING", value: true })
    const auth = getAuth();
    return (
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('success    : ', userCredential);
                dispatch({ type: "CHANGE_LOADING", value: false })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: "CHANGE_LOADING", value: false })
                // ..
            })
    )
}

export const LoginUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const dataUser = {
                    email: userCredential.email,
                    password: userCredential.uid,
                    emailVerified: userCredential.emailVerified
                }
                // Signed in 
                const user = userCredential.user;
                console.log('success    : ', userCredential);
                dispatch({ type: "CHANGE_ISLOGIN", value: false })
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_USER", value: dataUser })
                resolve(true)
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