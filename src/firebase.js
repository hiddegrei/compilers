
import firebase from "firebase";


const firebaseConfig = {
   apiKey: "AIzaSyDUBI0Gu6n_tO4wK9jV6dKzulCe6zfnVO4",
  authDomain: "the-compilers.firebaseapp.com",
  projectId: "the-compilers",
  storageBucket: "the-compilers.appspot.com",
  messagingSenderId: "165833853697",
  appId: "1:165833853697:web:af0a0922ac75b02b0f6900",
  measurementId: "G-Y64Y3HMRLE"
  };
// const firebaseConfig = {
//     apiKey: "AIzaSyALCLBa55Gzven0Vd13A_FP1KzJJcusRxU",
//     authDomain: "mediaapp-d96d1.firebaseapp.com",
//     projectId: "mediaapp-d96d1",
//     databaseURL: "https://mediaapp-d96d1.firebaseio.com",
//     storageBucket: "mediaapp-d96d1.appspot.com",
//     messagingSenderId: "275785490972",
//     appId: "1:275785490972:web:65ccaff57e382da10cb5d9",
//     measurementId: "G-E3J91N1ET9"
//   };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage = firebase.storage();


 export {db,auth,storage}