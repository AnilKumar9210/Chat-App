// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc ,doc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { Appcontext } from "../Context/Context";
import { useContext } from "react";
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
// const {setChatUser,setUserData,setChatData} = useContext(Appcontext)
 
const signin = async (username,email,password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        await setDoc(doc(db,"users",res.user.uid), {
          username:username.toLowerCase (),
          email:email,
          bio:"Hey there! I am using Chat App",
          profilePic:"",
          id:res.user.uid,
          name:username,
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

    const userDoc = await getDocs(query(collection(db, "users"), where("id", "==", user.uid)));
    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();
      // set user data in context
      return userData;
    }
  } catch (error) {
    console.error (error);
    toast.error (error.code.split("/")[1].split("-").join (" "));
  }
}

const logout = async ()=> {
  try {
    await auth.signOut();
    toast.success ("Logged out successfully");
    // setChatUser (null);
  } catch (err) {
    toast.error ("Something went wrong while logging out");
  }
}

const resetPassword = async (email)=> {
  if (!email) {
    toast.error ("Please enter your email");
    return;
  }
  try {
    const userRef = collection (db,"users");
    const q = query (userRef,where ("email","==",email));
    const userSnapshot = await getDocs (q);
    if (userSnapshot.empty) {
      toast.error ("User not found");
      return;
    } else {

      await sendPasswordResetEmail (auth,email);
      toast.success ("reset email sent");
    }
  } catch (error) {
    console.log(error);
    toast.error (error.message);
  }
}

export {signin,login,auth,db,logout,resetPassword}