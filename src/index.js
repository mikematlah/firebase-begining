import {initializeApp } from 'firebase/app'
import {
    getFirestore, collection,getDocs
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBg1AJreJNiuiTVcw6mnxeFqs27w9s2BWI",
    authDomain: "rwud-from-firebase.firebaseapp.com",
    projectId: "rwud-from-firebase",
    storageBucket: "rwud-from-firebase.appspot.com",
    messagingSenderId: "154732318545",
    appId: "1:154732318545:web:544465b25d90866c240d70"
  };
  //init firebase app
  initializeApp(firebaseConfig)

  //init services
    const db = getFirestore()

  //collection ref
    const colRef = collection(db,'books')

  //get collection data
    getDocs(colRef)
    .then((snapshot)=>{
       let books = []
       for(let el of snapshot.docs){
            books.push({...el.data(),id:el.id})
       }
       console.log(books)
    })
    .catch((err)=>{
        console.log(err.message)
    })
   

