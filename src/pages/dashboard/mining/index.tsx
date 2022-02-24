import Head from "next/head";
import DashboardSideBar from "../../../components/dashboardSidebar";

import { IoMdArrowDropdown } from 'react-icons/io';

import styles from "../../../styles/pages/DashboardMining.module.css";

export default function MiningTab() {

    return (
        <>
            <Head>
                <title>Cryptoneo | Mining</title>
            </Head>

            <div className={styles.dashMiningContainer}>
                <DashboardSideBar />

                <div className={styles.dashMiningContent}>

                    {/* Mining Hardware Info */}
                    <h1>Mining Hardware</h1>

                    {/* Hardware Block */}

                    <div className={styles.hardwareBlock}>
                        <div className={styles.cryptoColor}></div>

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
                        <IoMdArrowDropdown size={18} />

                        <div className={styles.moreDetailsContainer}>
                            <h2>GPU: RTX 3060 12GB</h2>
                            <h3>ID: 81421391224</h3>

                            <button className={styles.stopStartMiningBtn}>Stop Mining</button>
                        </div>

                    </div>

                    {/* <div className={styles.hardwareBlock}>
                        <div className={styles.cryptoColor} style={{ backgroundColor: 'var(--Ethereum)' }}></div>

                        <div className={styles.hardwareContent}>

                            <div className={styles.hardwareDetails}>
                                <h2>
                                    <span className={styles.statusOffline}>Name: </span>My GPU 2
                                </h2>

                                <h3>
                                    <span className={styles.statusOffline}>Blockchain: </span>Ethereum
                                </h3>
                            </div>

                            <div className={styles.mobileStatusBallOffline}></div>

                            <h2 className={styles.desktopStatus}>
                                STATUS: <span className={styles.statusOffline}>OFFLINE</span>
                            </h2>

                        </div>

                        <IoMdArrowDropdown size={18} />

                  
                        <div className={styles.moreDetailsContainer}>
                            <p>NINGUEM ME PARA!</p>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    )
}