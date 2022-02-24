import Link from 'next/link';
import axios from 'axios';

// Icons
import { FaUserAlt, FaWallet } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { BsLightningChargeFill } from 'react-icons/bs';
// import { BiFullscreen } from 'react-icons/bi';

import styles from '../styles/components/DashboardSideBar.module.css';

export default function DashboardSideBar(props) {
    console.log(props.userID)
    let getUserID = props.userID

    function getCryptoPrice() {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then((res) => {
                console.log(res.data)
            }).catch((res) => {
                console.log(res)
            })
    }

    return (
        <div className={styles.sideBarContainer}>
            <FaUserAlt size={21} />

            <div className={styles.sideBarAppTools}>
                <Link href={{
                    pathname: "/dashboard/currency",
                    query: { userID: getUserID }
                }}>
                    <IoStatsChart size={26} />
                </Link>
                <Link href={{
                    pathname: "/dashboard/mining",
                    query: { userID: getUserID }
                }}>
                    <BsLightningChargeFill size={26} />
                </Link>
                <Link href={{
                    pathname: "/dashboard/wallet",
                    query: { userID: getUserID }
                }}>
                    <FaWallet size={26} />
                </Link>
            </div>

            <div className={styles.sideBarAppSettings}>
                <IoIosSettings size={26} onClick={() => getCryptoPrice()} />
                {/* <BiFullscreen size={25} onClick={() => document.documentElement.requestFullscreen()} /> */}
            </div>
        </div>
    )
};