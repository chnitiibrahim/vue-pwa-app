import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'xxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxx'
}
firebase.initializeApp(config)

export default firebase
