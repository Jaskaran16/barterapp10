import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyAZqNlcBzHt7yE3XuxNwVu6pynrN6Ff_5Y",
  authDomain: "barter-app-9d2d8.firebaseapp.com",
  projectId: "barter-app-9d2d8",
  storageBucket: "barter-app-9d2d8.appspot.com",
  messagingSenderId: "627311241722",
  appId: "1:627311241722:web:3370a0e1f2225356891c43"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();