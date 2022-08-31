import firebase from '../firebase'

export const googleFirebase = async (callback) => {
    const provider = new firebase.firebase_.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                callback({success: true,result})
            }).catch((error) => {
            callback({success: false, message: "something went wrong"})
        });
};
