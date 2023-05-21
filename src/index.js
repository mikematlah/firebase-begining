import {initializeApp } from 'firebase/app'
import {
    getFirestore, collection,onSnapshot,
    addDoc,deleteDoc,doc,
    query,where,
    orderBy,serverTimestamp,
    getDoc

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

  //queries
const q = query(colRef,orderBy('createdAt'))

  //real time collection data
   
    onSnapshot(q,(snapshot)=>{
      let books = []
      for(let el of snapshot.docs){
           books.push({...el.data(),id:el.id})
      }
      console.log(books)
    })

    // adding document
    const addBookForm = document.querySelector('.add')
    addBookForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      
      addDoc(colRef,{
        title:addBookForm.title.value ,
        author:addBookForm.author.value,
        createdAt:serverTimestamp()
      })
      .then(()=>{
        addBookForm.reset() 
      })
      
    })
  
    //delete document
    const deleteBookForm = document.querySelector('.delete')
    deleteBookForm.addEventListener('submit',(e)=>{
      e.preventDefault()
    
     const docRef = doc(db,'books',deleteBookForm.id.value)
     console.log(deleteBookForm.id.value)
     deleteDoc(docRef)
     .then(()=>{
        deleteBookForm.reset()
     })


    })
     //get a single document
     const docRef = doc(db,'books','u7tG9fwQN81450aHIryC')
    
     onSnapshot(docRef,(doc)=>{

        console.log(doc.data())
     })
      
     
  
   
     
 
   
     
    
     
    
    
      
     

  


   

