import { createContext } from "react";
import { useState } from "react";
import {doc,getDoc} from 'firebase/firestore'
import { db } from "../Configuration/Firebase";
export const Appcontext = createContext ();

const AppContextProvider = (props)=> {

    const [userData,setUserData] = useState (null);
    const [chat,setChat] = useState (null);

    const loadUserData = async (uid)=> {
        const docSnap = await getDoc (doc (db,"users",uid));
        console.log(docSnap.data ());
    }
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