import {initializeApp } from 'firebase/app'
import {
    getFirestore, collection,onSnapshot,
    addDoc,deleteDoc,doc,
    query,where,
    orderBy,serverTimestamp,
    getDoc,updateDoc

 } from 'firebase/firestore'
 import {
  getAuth, createUserWithEmailAndPassword
 } from 'firebase/auth'

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
    const auth = getAuth()

  //collection ref
    const colRef = collection(db,'books')
   //display database
 
     function renderData(data){
        let html = ''
           for(let el of data){
            html +=`
            <div class="element">
              <p>ID: ${el.id}</p>
              <p>Title: ${el.title}</p>
              <p>Author: ${el.author}</p>
              
            </div>
              `
           }
          elements.innerHTML = html
      }

  //queries
const q = query(colRef,orderBy('createdAt'))

  //real time collection data
  const elements = document.querySelector('.data')
    onSnapshot(q,(snapshot)=>{
      let books = []
      for(let el of snapshot.docs){
           books.push({...el.data(),id:el.id})
      }
      console.log(books)
      renderData(books)
      
      
      
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
     const getSingleDocForm = document.querySelector('.get-doc')
     const singleDoc = document.querySelector('.single')
     
     getSingleDocForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const docRef = doc(db,'books',getSingleDocForm.id.value)
        onSnapshot(docRef,(doc)=>{
          let document = doc.data()
          let id = doc.id
          console.log(doc.data())
          singleDoc.innerHTML =
          `
          <div class="element">
            <p>ID: ${id}</p>
            <p>Title: ${document.title}</p>
            <p>Author: ${document.author}</p>
        
          </div>
  
          `
          getSingleDocForm.reset()
         
       })
     })
    
  
    //update a document 
    const updateForm = document.querySelector('.update')
    updateForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      const docRef = doc(db,'books',updateForm.id.value)
      updateDoc(docRef,{
        title:updateForm.title.value,
        author:updateForm.author.value
      })
      .then(()=>{
        updateForm.reset()
      })

      
    })
    //signing users up
    const signupForm = document.querySelector('.signup')
    signupForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      const email = signupForm.email.value
      const password = signupForm.password.value
      createUserWithEmailAndPassword(auth,email,password)
      .then((cred)=>{
        console.log('user created',cred.user)
        signupForm.reset()
      })
      .catch((err)=>{
        console.log('error:',err.message)
      })

    })
    
     
  
   
     
 
   
     
    
     
    
    
      
     

  


   

