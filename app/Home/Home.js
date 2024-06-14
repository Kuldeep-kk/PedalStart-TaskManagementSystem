'use client';
import React, {useContext} from 'react';
import HeroSection from "@/app/components/HeroSection/HeroSection";
import SoftMobWeb from "@/app/components/SoftMobWeb/SoftMobWeb";
import DownloadApp from "@/app/components/DownloadApp/DownloadApp";
import PageWrapper from "@/app/PageWrapper";
import {motion,AnimatePresence} from "framer-motion";
import AddTask from "@/app/components/AddTask/AddTask";
import UserContext from "@/app/context/userContext";
import {useSession} from "next-auth/react";
import useSWR, {mutate} from "swr";

const Home = () => {
    const { data: sessionData } = useSession();
    const context=useContext(UserContext);
    const fetcher = (url) => fetch(url).then((res) => res.json());


    const email = sessionData?.user?.email;
    const { data, error } = useSWR(email ? `/api/post?email=${email}` : null, fetcher);

    const taskEmail = data && data.length > 0 ? data[0].email : null;

    return (
        <div>
        <PageWrapper>
            <HeroSection/>
            <SoftMobWeb/>
            <DownloadApp/>
        </PageWrapper>
            <AnimatePresence>
                {context.openNewTask &&
                (<motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.8}}
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 backdrop-blur-sm"
                    onClick={() => {
                        context.setOpenNewTask(false);

                    }}

                />
                <motion.div
                    initial={{y: 50, opacity: 0, scale: 0}}
                    animate={{y: 0, opacity: 1, scale: 1}}
                    exit={{y: 50, opacity: 0, scale: 0}}
                    className="fixed transform">
                   <AddTask mutate={mutate} cEmail={taskEmail}/>

                </motion.div>


            </motion.div>

                )}

            </AnimatePresence>
        </div>
    );
};

export default Home;