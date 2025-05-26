import { createContext, useEffect } from "react";
import { useState } from "react";
import {doc,getDoc, onSnapshot} from 'firebase/firestore'
import { db } from "../Configuration/Firebase";
export const Appcontext = createContext ();

const AppContextProvider = (props)=> {

    const [userData,setUserData] = useState (null);
    const [chat,setChat] = useState (null);
    const [chatData,setChatData] = useState (null);

    const loadUserData = async (uid)=> {
        const docSnap = await getDoc (doc (db,"users",uid));
        console.log(docSnap.data ());
        setUserData(docSnap.data ());
    }

    useEffect (()=> {
        if (userData) {
            const chatRef = doc (db,"userChats",userData.id);
            const unSub = onSnapshot (chatRef, async (doc)=> {
                const chats = doc.data ().chatData;
                const tempData = [];
                for (const key in chats) {
                    const userSnap = await getDoc (doc (db,"chats",key.rId));
                    const userChatData = userSnap.data ();
                    tempData.push ({
                        ...key,
                        userChatData,
                    })

                    setChatData (tempData.sort ((a,b)=>a.updatedAt - b.updatedAt));
                }
            })

            return ()=> {
                unSub ();
            }
        } else {
            setChatData (null);
        }
    })
    const value = {
        userData,
        setUserData,
        chat,
        setChat,loadUserData
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider