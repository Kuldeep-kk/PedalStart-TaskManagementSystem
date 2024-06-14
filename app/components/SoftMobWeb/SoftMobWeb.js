'use client';
import React, {useEffect} from 'react';
import {SiCakephp} from "react-icons/si";
import {FaRankingStar} from "react-icons/fa6";
import {BsGeoFill} from "react-icons/bs";
import {FaEdit, FaPlusCircle, FaPuzzlePiece, FaTrashAlt} from "react-icons/fa";
import {motion,useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {MdAddLink} from "react-icons/md";
import {FiEdit3} from "react-icons/fi";
import {AiOutlineClear} from "react-icons/ai";

const SoftMobWeb = () => {

    const data = [
        {
            title: "Add New Tasks",
            description: "Easily create new tasks to stay on top of your to-dos.",
            imageSrc: <MdAddLink  size={50} />
        },
        {
            title: "Modify Your Tasks",
            description: "Update your tasks effortlessly to reflect changes and progress.",
            imageSrc: <FiEdit3 size={40} />
        },
        {
            title: "Delete Unneeded Tasks",
            description: "Remove tasks you no longer need to keep your list clean and organized.",
            imageSrc:<AiOutlineClear size={40} />
        }
    ]

    const controls = useAnimation();
    const [refOneToOne,inViewOne]=useInView();
    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const images = {
        hidden: {
            opacity: 0,
            x: 30,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1
            },
        },
    };

    useEffect(() => {
        if (inViewOne) {
            controls.start("show");
        }
    }, [controls, inViewOne]);
    return (
        <div className={`flex flex-col items-center justify-center mx-10 md:mx-32 pb-28 `}>
            <h2 className={`text-2xl font-semibold text-slate-500`}>
                Powerful Features to Boost Your Productivity
            </h2>
            <p className={`text-slate-400 text-center`}>
                Discover how our comprehensive suite of tools helps you manage tasks effortlessly and achieve your goals.
            </p>
            <motion.div
                variants={variants}
                initial="hidden"
                ref={refOneToOne}

                animate={controls} className={`grid grid-cols-1 md:grid-cols-3 items-center gap-32  w-full`}>
                {data.map((item, index) => (
                    <motion.div variants={images} key={index}
                                className={`flex flex-col items-center mt-20`}>
                        <div className={`text-slate-300`}>{item.imageSrc}</div>
                        <h2 className={`font-semibold text-slate-500 text-xl`}>{item.title}</h2>
                        <p className={`text-slate-500 text-sm text-center`}>{item.description}</p>


                    </motion.div>

                ))}

            </motion.div>

        </div>
    );
};

export default SoftMobWeb;