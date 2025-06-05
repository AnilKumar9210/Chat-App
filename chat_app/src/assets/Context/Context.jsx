import { createContext, useEffect } from "react";
import { useState } from "react";
import {doc,getDoc, onSnapshot, updateDoc} from 'firebase/firestore'
import { auth, db } from "../Configuration/Firebase";
export const Appcontext = createContext ();

const AppContextProvider = (props)=> {

    const [userData,setUserData] = useState (null);
    // const [chat,setChat] = useState (null);
    const [chatData,setChatData] = useState (null);

    const loadUserData = async (uid)=> {
        const docSnap = await getDoc (doc (db,"users",uid));
        // console.log(docSnap.data ());
        setInterval (async ()=> {
            if (auth.chatUser) {
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
            const unSub = onSnapshot (chatRef, async (doc)=> {
                const chats = doc.data ().chatData;
                const tempData = [];
                for (const key in chats) {
                    const userSnap = await getDoc(doc (db,"chats",key.rId));
                    const userData = userSnap.data ();
                    tempData.push ({
                        ...key,
                        userData,
                    })
                    console.log(tempData,"Ehlow")
                    setChatData (tempData.sort ((a,b)=>a.updatedAt - b.updatedAt));
                    // setChatData (tempData)
                }
            })

            return ()=> {
                unSub ();
            }
        } else {
            setChatData (null);
        }
    },[]);
    const value = {
        userData,
        setUserData,
        chatData,
        setChatData,loadUserData
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider