import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

// Icons
import { FaUserAlt, FaWallet } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { BsLightningChargeFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
// import { BiFullscreen } from 'react-icons/bi';

import styles from '../styles/components/DashboardSideBar.module.css';

export default function DashboardSideBar() {

    const router = useRouter();

    function userLogout() {

        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('login');

        router.push({
            pathname: '/login'
        })
    }

    return (
        <div className={styles.sideBarContainer}>
            <Link href={{
                pathname: "/dashboard/profile"
            }}>
                <FaUserAlt size={21} />
            </Link>

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
                <BiLogOut size={26} onClick={() => userLogout()} />
            </div>
        </div>
    )
};