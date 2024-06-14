import React, {useState} from 'react';
import styles from './grid.module.css';
import { format, isBefore } from 'date-fns';
import {FiEdit3} from "react-icons/fi";
import {RxCross2} from "react-icons/rx";
import {AnimatePresence, motion} from "framer-motion";
import EditTask from "@/app/components/EditTask/EditTask";
import {deleteTask} from "@/app/services/taskService";

const GridCard = ({ title, description, dueDate, cEmail, cPostId,mutate }) => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const formattedDate = format(dueDateObj, 'dd-MM-yy');
    const isPastDue = isBefore(dueDateObj, today);
    const [openEdit,setOpenEdit]=useState(false);

    const handleDelete=async ()=>{
        const result=await deleteTask({cEmail,cPostId});
        if (result.success) {
            mutate(`/api/post?email=${cEmail}`);
        } else {
            console.error("Failed to delete task");
        }
    }



    return (
        <div>
        <div className={`relative flex flex-col w-full justify-center ${styles.mainDiv} px-5 py-7 gap-5 items-center`}>
            <div className={`flex flex-col w-full justify-center items-center`}>
                <h1 className={`text-sm font-semibold text-slate-300 ${styles.desc} px-3 py-1`}>Title</h1>
                <h2 className={`capitalize text-slate-400`}>{title}</h2>
            </div>
            <div className={`flex flex-col w-full justify-center items-center`}>
                <h1 className={`${styles.desc} px-3 py-1 text-sm`}>Description</h1>
                <h2 className={`text-center p-2 text-slate-400 `}>{description}</h2>
            </div>
            <div className={`text-slate-300`}>
                Due Date: <span className={`${isPastDue?'text-red-400':'text-green-400'}`} >{formattedDate}</span>
            </div>
            <div className={`flex absolute right-5 top-5 gap-4  items-center`}>
                <FiEdit3 size={20} className={`hover:scale-110 text-blue-400 `}  onClick={()=>{
                    setOpenEdit(true);

                }}/>
                <RxCross2 size={20} className={`hover:scale-110 bg-red-400 rounded-xl p-0.5 `} onClick={handleDelete} />
            </div>
        </div>
        <AnimatePresence>
    {openEdit &&
    (<motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 backdrop-blur-sm"
                onClick={() => {
                    setOpenEdit(false);

                }}

            />
            <motion.div
                initial={{y: 50, opacity: 0, scale: 0}}
                animate={{y: 0, opacity: 1, scale: 1}}
                exit={{y: 50, opacity: 0, scale: 0}}
                className="fixed transform">
                <EditTask eTitle={title} eDescription={description} eDueDate={dueDate} cEmail={cEmail} cPostId={cPostId} mutate={mutate} onClose={()=>setOpenEdit(false)} />

            </motion.div>


        </motion.div>

    )}

</AnimatePresence>
        </div>
    );
};

export default GridCard;
