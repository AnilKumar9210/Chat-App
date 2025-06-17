import { createContext, useEffect } from "react";
import { useState } from "react";
import {doc,getDoc, onSnapshot, updateDoc} from 'firebase/firestore'

import { auth, db } from "../Configuration/Firebase";
export const Appcontext = createContext ();

const AppContextProvider = (props)=> {

    const [userData,setUserData] = useState (null);
    // const [chat,setChat] = useState (null);
    const [chatData,setChatData] = useState (null);
    const [messageId,setMessageId] = useState (null);
    const [messages,setMessages] = useState (null);
    const [chatUser,setChatUser] = useState (null);

    const loadUserData = async (uid)=> {
        const docSnap = await getDoc (doc (db,"users",uid));
        // console.log(docSnap.data ());
        setInterval (async ()=> {
            if (auth.currentUser) {
                await updateDoc (doc (db,"users",uid),{
                    lastSeen:Date.now (),
                })
            }
        },6000)
        setUserData(docSnap.data ());
    }

    useEffect (()=> {
        if (userData) {
            const chatRef = doc (db,"userChats",userData.id);
            const unSub = onSnapshot (chatRef, async (docs)=> {
                const chats = docs.data ().chatData;
                const tempData = [];
                for (const key of chats) {
                    const userRef = doc(db,"userChats",key.rId);
                    const userSnap = await getDoc (userRef);
                    const userData = userSnap.data ();
                    tempData.push ({
                        ...key,
                        userData,
                    })
                    setChatData (tempData.sort ((a,b)=>b.updatedAt - a.updatedAt));
                }
            })

            return ()=> {
                unSub ();
            }
        } else {
            setChatData (null);
        }
    },[userData]);
    const value = {
        userData,
        setUserData,
        chatData,
        setChatData,loadUserData,
        messages,setMessages,
        messageId,setMessageId,
        chatUser,setChatUser,
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider