"use client";
import React, {useContext, useEffect, useState} from 'react';
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import styles from "./login.module.css";

import {useRouter} from "next/navigation";

import Swal from "sweetalert2";
import UserContext from "@/app/context/userContext";

import {FcGoogle} from "react-icons/fc";
import { useSession, signIn } from "next-auth/react";
const Login = () => {
    
    const router=useRouter();
    const context=useContext(UserContext);
    const {status,data}=useSession();
    const handleSignIn = async () => {
        await signIn('google');

    };
    console.log(status,data);

    return (<AuthLayout>
        <div className={`relative h-full w-full `}>
            <div className={`md:p-5 flex flex-col gap-2`}>
                <h2 className={`text-center md:text-left text-xl font-bold text-slate-500 ${styles.mainHeading}`}>
                    Welcome back to <span className={`text-2xl italic ${styles.subHead} `}>PedalStart!</span>
                </h2>
                <p className={`text-center md:text-left text-sm text-slate-400`}>Where every lesson is a new discovery.</p>
            </div>
            <div className={`flex flex-col  justify-center items-center mt-7 gap-8 `}>
                <div className={`input-button mt-2`}>
                    <button onClick={handleSignIn} className={`${styles.inputGButton} flex bg-slate-950 p-4 opacity-60 rounded-3xl`}>Sign In with Google<FcGoogle size={25} className={`ml-2`}/>
                    </button>
                </div>

            </div>


        </div>
    </AuthLayout>);
};

export default Login;