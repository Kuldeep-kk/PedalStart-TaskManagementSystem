'use client';
import React, {useContext, useState} from 'react';
import useSWR ,{ mutate }  from "swr";
import {useSession} from "next-auth/react";
import GridCard from "@/app/components/gridCard/GridCard";
import {AnimatePresence, motion} from "framer-motion";
import AddTask from "@/app/components/AddTask/AddTask";
import UserContext from "@/app/context/userContext";
import nothing from '@/public/nothing.png'
import Image from "next/image";

const Dashboard = () => {
    const { data: sessionData } = useSession();
    const context=useContext(UserContext);
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const email = sessionData?.user?.email;
    const { data, error } = useSWR(email ? `/api/post?email=${email}` : null, fetcher);




    return (
        <div>
        <div className={`w-full flex flex-col items-center justify-center pt-32`}>
            {data && data[0].posts.length>0 ?
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20`}>
                {data[0].posts.map((post, index) => (
                    <div className={`w-72`} key={index}>
                       <GridCard key={index} title={post.title} description={post.description} dueDate={post.dueDate}
                       cEmail={data[0].email} cPostId={post._id} mutate={mutate}/>
                    </div>

                ))}

            </div>
            : <div>
                    <Image src={nothing} alt={"Nothing to show here"}/>
                    <h2 className={`text-center text-lg text-slate-300 `}>Nothing to show here...</h2>


                </div>}

        </div>
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
                                <AddTask mutate={mutate} cEmail={data[0].email}/>

                            </motion.div>


                        </motion.div>

                    )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
