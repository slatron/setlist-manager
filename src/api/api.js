import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { config } from '/src/secrets';
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

// Initialize DB
const app = initializeApp(config);
const db = getDatabase(app);
const songlistRef = ref(db, 'data/songLists');
const songsRef = ref(db, 'data/songs');

const methods = {
  getSonglistsRef: () => songlistRef,
  getSongsRef: () => songsRef,
  getSongRef: id => ref(db, `data/songs/${id}`),
  getSonglistRef: id => ref(db, `data/songLists/${id}`),
  getSonglistSongsRef: id => ref(db, `data/songLists/${id}/songs`),
  
  login: (email, pass) => {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, pass)
      .then((response) => {
        // console.log('email login response: ', response)
        console.log('...you are signed in!')
      });
  },

  guestLogin: () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((response) => {
        // console.log('guest login response: ', response)
        console.log('...you are signed in as a guest!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage})
      });
  },

  logout: () => {
    const auth = getAuth();
    return signOut(auth)
      .then(() => console.log('You have signed out'))
      .catch(error => console.log('Error signing out: ', error))
  },

  registerUser: (email, pass) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, pass)
      .then(() => alert(`Created new user ${email}, logging in now.`))
      .catch(error => console.errorr('Error registering user: ', error))
  },

  updatePassword: email => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then(() => alert(`Password Update Email Sent to ${email}`))
      .catch(error => console.error('Error updating password: ', error))
  },

  getLoginObserver: callback => {
    const auth = getAuth();
    return onAuthStateChanged(auth, user => {
      user = user ? user : {}
      callback(user)
    })
  }
};

export default methods;
