'use client';


import UserContext from "@/app/context/userContext";
import {useState} from "react";
import {SessionProvider} from "next-auth/react";

const UserProvider=({children})=>{
    const [openNewTask,setOpenNewTask]=useState(false);

    return(
        <UserContext.Provider value={{openNewTask,setOpenNewTask}}>
            <SessionProvider>
            {children}
            </SessionProvider>
        </UserContext.Provider>

    );
}
export default UserProvider;