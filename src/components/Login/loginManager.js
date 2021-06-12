import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
// firebase.initializeApp(firebaseConfig);
export const initializeLoginFramework = () =>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            setUserToken();
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

const setUserToken=()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        sessionStorage.setItem('token',idToken)
      }).catch(function(error) {
        // Handle error
      });
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();    
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            user.success = true;
            var accessToken = credential.accessToken;
            console.log(user)
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            // ...
        });

}

const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signOutUser;
        })
        .catch(err => {

        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUserName(name);
                    return newUserInfo;
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = {  }
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res  => {
        // Signed in
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        var errorMessage = error.message;
        const newUserInfo = {  }
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    })
        .then(function () {
            console.log('UsserName Updated Successfully')
        }).catch(function (error) {
            console.log(error)
        });
}