import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const handleUserProfile = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const { uid } = userAuth;
    const userRef = firestore.doc(`users/${uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const timeStamp = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timeStamp,
                ...additionalData
            });
        } catch(e) {
            console.log(e);
        }
        
    }
    return userRef;
}
