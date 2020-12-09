import * as React from "react";
import logo from './logo.svg';
import firebase from "firebase/app";
import "firebase/firestore";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import {
  FirestoreCollection,
  FirestoreProvider
} from "@react-firebase/firestore";
import './App.css';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyClcuxVE-KjdUm_O29OGgCU5RpmxbWJUxk",
    authDomain: "human-spectrum-project.firebaseapp.com",
    projectId: "human-spectrum-project",
    storageBucket: "human-spectrum-project.appspot.com",
    messagingSenderId: "747320818353",
    appId: "1:747320818353:web:d2c5f61ac57ea711ea8090",
    measurementId: "G-SK6ENKVX12"
  };
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  
  // var db = firestore();

  //   db.collection("users").add({
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815
  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });
  return (
    <div className="App">
      <FirestoreProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreCollection
            path={"users"}
            limit={2}
          >
              {({ value }) => {
                console.log('===',value)
               if (value) {
                return value.map(x => (
                  <div>
                    <pre>{x.email}</pre>
                  </div>
                ))
               }
             
            }}
          </FirestoreCollection>
        </FirestoreProvider>
    </div>
  );
}

export default App;
