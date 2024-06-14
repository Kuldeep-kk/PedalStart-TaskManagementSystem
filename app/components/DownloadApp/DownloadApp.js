import React from 'react';
import styles from './downloadapp.module.css';
import Image from "next/image";
import Mob from '@/public/DownloadApp/mob.png';
import Mobs1 from '@/public/DownloadApp/subMob1.png';
import Mobs2 from '@/public/DownloadApp/subMob2.png';
import Mobs3 from '@/public/DownloadApp/subMob3.png';
import Mobs4 from '@/public/DownloadApp/subMob4.png';
import Mobs5 from '@/public/DownloadApp/subMob5.png';

const DownloadApp = () => {
    return (
        <div className={`${styles.mainDiv} flex flex-col md:flex-row justify-center items-center py-10 md:py-20 px-5 md:px-20 rounded-tl-[150px] md:rounded-tl-[300px]`}>
            <div className={`w-full md:w-1/2 flex flex-col items-center relative`}>
                <Image src={Mob} alt={"Mobile"} className={`w-40 md:52 lg:w-52 ${styles.Mob}`}/>
                <Image src={Mobs1} alt={"subImg"} className={`w-14 absolute right-10 md:right-20 top-10 ${styles.mobs1}`}/>
                <Image src={Mobs2} alt={"subImg"} className={`w-20 absolute right-14 md:right-28 top-40 ${styles.mobs2}`}/>
                <Image src={Mobs3} alt={"subImg"} className={`w-14 absolute right-20 md:right-36 top-28 ${styles.mobs3}`}/>
                <Image src={Mobs4} alt={"subImg"} className={`w-14 absolute left-10 md:left-40 top-10 ${styles.mobs4}`}/>
                <Image src={Mobs5} alt={"subImg"} className={`w-14 absolute left-10 md:left-28 top-32 ${styles.mobs5}`}/>
            </div>
            <div className={`w-full md:w-1/2 flex flex-col items-center justify-center gap-5 `}>
                <h1 className={`text-xl text-center md:text-2xl lg:text-4xl font-semibold text-slate-500`}>
                    Your Tasks Anywhere, Anytime - Accessible on Mobile and Desktop
                </h1>
                <p className={`text-slate-400 text-center`}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Manage your tasks seamlessly whether you're on your mobile, tablet, or laptop.
                </p>
            </div>

        </div>
    );
};

export default DownloadApp;