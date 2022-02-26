import Link from 'next/link';
import axios from 'axios';

// Icons
import { FaUserAlt, FaWallet } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { BsLightningChargeFill } from 'react-icons/bs';
// import { BiFullscreen } from 'react-icons/bi';

import styles from '../styles/components/DashboardSideBar.module.css';

export default function DashboardSideBar() {

    return (
        <div className={styles.sideBarContainer}>
            <FaUserAlt size={21} />

            <div className={styles.sideBarAppTools}>
                <Link href={{
                    pathname: "/dashboard/currency"
                }}>
                    <IoStatsChart size={26} />
                </Link>
                <Link href={{
                    pathname: "/dashboard/mining"
                }}>
                    <BsLightningChargeFill size={26} />
                </Link>
                <Link href={{
                    pathname: "/dashboard/wallet",
                }}>
                    <FaWallet size={26} />
                </Link>
            </div>

            <div className={styles.sideBarAppSettings}>
                <IoIosSettings size={26} />
                {/* <BiFullscreen size={25} onClick={() => document.documentElement.requestFullscreen()} /> */}
            </div>
        </div>
    )
};