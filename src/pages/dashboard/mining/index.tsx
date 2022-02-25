import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { UserData } from "../../login";
import DashboardSideBar from "../../../components/dashboardSidebar";

// Icons
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import styles from "../../../styles/pages/DashboardMining.module.css";

// interface UserDataProps {
//     data: UserData
// }

export default function MiningTab() {

    const [userHardwareData, setUserHardwareData] = useState();
    const [moreHardwareDetails, setMoreHardwareDetails] = useState(false);

    useEffect(() => {

        const userID = sessionStorage.getItem('userID')

        axios.get(`http://localhost:4000/users/${userID}`)
            .then((res) => {
                console.log(res.data.hardwareMining);
                setUserHardwareData(res.data.hardwareMining);
            }).catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <Head>
                <title>Cryptoneo | Mining</title>
            </Head>

            <DashboardSideBar />

            <div className={styles.dashMiningContainer}>

                <div></div>

                <div className={styles.dashMiningContent}>

                    {/* Mining Hardware Info */}
                    <h1>Mining Hardware</h1>

                    {/* Hardware Block */}
                    <div className={styles.hardwareBlock}>
                        <div className={styles.cryptoColor} style={{ backgroundColor: 'var(--Bitcoin)' }}></div>

                        <div className={styles.hardwareContent}>

                            <div className={styles.hardwareDetails}>
                                <h2>
                                    <span className={styles.statusOnline}>Name: </span>My GPU 1
                                </h2>
                                <h3>
                                    <span className={styles.statusOnline}>Blockchain: </span>Bitcoin
                                </h3>
                            </div>

                            <div className={styles.mobileStatusBallOnline}></div>

                            <h2 className={styles.desktopStatus}>
                                STATUS: <span className={styles.statusOnline}>ONLINE</span>
                            </h2>

                        </div>

                        {/* Arrow UP/DOWN */}
                        {moreHardwareDetails ?
                            <IoMdArrowDropup size={18} onClick={() => setMoreHardwareDetails(false)} />
                            :
                            <IoMdArrowDropdown size={18} onClick={() => setMoreHardwareDetails(true)} />}

                        {/* Display Hardware Details */}
                        {moreHardwareDetails ?
                            <div className={styles.moreDetailsContainer}>
                                <div className={styles.hardwareSpecs}>
                                    <h2><span className={styles.statusOnline}>GPU: </span>RTX 3060 12GB</h2>
                                    <h3><span className={styles.statusOnline}>ID: </span> 81421391224</h3>
                                </div>

                                <div className={styles.totalGainsContainer}>
                                    <div>
                                        <h2>Total gains in the last 30 days</h2>
                                        <h3>
                                            0.00183040
                                            <span> $ 80.01 USD</span>
                                        </h3>
                                    </div>

                                    <h2>All gains are automatically sent to local wallet.</h2>
                                </div>

                                <button className={styles.stopStartMiningBtn}>
                                    Stop Mining
                                </button>
                            </div>
                            :
                            <div></div>
                        }

                    </div>

                </div>
            </div>
        </>
    )
}