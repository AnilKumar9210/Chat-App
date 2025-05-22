// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc ,doc } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyBxMF_UkGpeQjMIOBj8CCCBeap3-TWAopQ",
  authDomain: "chat-app-c2551.firebaseapp.com",
  projectId: "chat-app-c2551",
  storageBucket: "chat-app-c2551.firebasestorage.app",
  messagingSenderId: "1024556383332",
  appId: "1:1024556383332:web:9bb009b8865595d9177371",
  measurementId: "G-S7F4HLZ279"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signin = async (username,email,password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        await setDoc(doc(db,"users",res.user.uid), {
          username:username.toLowerCase (),
          email:email,
          bio:"Hey there! I am using Chat App",
          profilePic:"",
          id:res.user.uid,
          name:"",
          lastSeen:Date.now (),
        })

        await setDoc (doc(db,"userChats",res.user.uid), {
          chatData:[],
        })
    } catch (error){
      console.error (error);
      toast.error (error.code.split("/")[1].split("-").join (" "));
    }
}

const login = async (email,password)=> {
  try {
    const res = await signInWithEmailAndPassword (auth,email,password);
    const user = res.user;

  } catch (error) {
    console.error (error);
    toast.error (error.code.split("/")[1].split("-").join (" "));
  }
}

export {signin,login}