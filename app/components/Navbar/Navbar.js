'use client';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { TbBrandGoogleHome } from "react-icons/tb";
import { MdDesignServices } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { HiMenuAlt1, HiOutlineLogout } from "react-icons/hi";
import styles from './navbar.module.css';
import { usePathname } from "next/navigation";
import UserContext from "@/app/context/userContext";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { motion } from 'framer-motion';

const Navbar = () => {
    const { status, data } = useSession();
    const [openDropbox, setOpenDropbox] = useState(false);
    const menuItems = [
        { icon: <TbBrandGoogleHome size={25} />, label: 'Home', href: '/' },
        { icon: <MdDesignServices size={25} />, label: 'Dashboard', href: '/Dashboard' },
    ];
    const path = usePathname();
    const context = useContext(UserContext);

    return (
        <nav className={`${status === 'authenticated' ? 'flex' : 'hidden'} justify-between items-center w-full px-6 md:px-20 lg:px-32 h-20 fixed ${styles.mainNav}`}>
            <div className="text-2xl font-semibold text-slate-300">
                <span className={styles.subLogo}>Pedal</span>Start
            </div>
            <div className="hidden md:flex items-center gap-8 lg:gap-20 text-slate-500">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <div  className={`${path === item.href ? styles.subLogo : ''} flex justify-center items-center gap-1 transition ease-in-out duration-150 hover:scale-110 cursor-pointer`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <button className={`flex items-center gap-3 ${styles.contactBtn} p-2 text-white rounded`} onClick={() => context.setOpenNewTask(!context.openNewTask)}>
                    <FiEdit3 size={20} />
                    <span>Task</span>
                </button>
                {data?.user.image && (
                    <img
                        src={data.user.image}
                        alt="Profile picture"
                        width={40}
                        height={40}
                        className="rounded-full hover:cursor-pointer"
                        onClick={() => setOpenDropbox(!openDropbox)}
                    />
                )}

                <Link  href={'/'}  className={`md:hidden ${path === '/' ? 'hidden' : 'block'}`}><TbBrandGoogleHome size={25} /></Link>
                <Link href={'/Dashboard'} className={`md:hidden ${path === '/Dashboard' ? 'hidden' : 'block'}`}><MdDesignServices size={25} /></Link>

            </div>
            {openDropbox && (
                <motion.div
                    initial={{ y: -50, opacity: 0, scale: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.1 } }}
                    exit={{ y: -50, opacity: 0, scale: 0 }}
                    className={`absolute top-16 right-4 md:right-16 py-2 w-40 px-2 flex flex-col gap-3 ${styles.dropbox} rounded-3xl`}
                >
                    <h2 className={`text-center font-semibold mt-2 text-white capitalize`}>{data?.user.name}</h2>
                    <hr />
                    <button
                        className={`w-full p-1 flex items-center justify-center gap-2 ${styles.logoutBtn}`}
                        onClick={signOut}
                    >
                        <HiOutlineLogout size={25} />
                        Logout
                    </button>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
