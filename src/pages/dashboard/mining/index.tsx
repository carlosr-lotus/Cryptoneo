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

interface userDataInterface {
    name: string,
    login: string,
    hardwareMining: [any]
}

export default function MiningTab() {

    const router = useRouter();

    const [userDataInterface, setUserDataInterface] = useState<userDataInterface>()
    const [userHardwareData, setUserHardwareData] = useState([]);
    const [moreHardwareDetails, setMoreHardwareDetails] = useState({});

    useEffect(() => {
        getUserData()
    }, []);

    // GET request to DB to get user data
    function getUserData() {
        const userID = sessionStorage.getItem('userID')

        axios.get(`http://localhost:4000/users/${userID}`)
            .then((res) => {
                setUserHardwareData(res.data.hardwareMining);
                setUserDataInterface(res.data)
            }).catch(error => {
                console.log(error);
            })
    }

    // PUT request to DB to update item
    function updateItem(statusUpdate, hardwareIndex) {
        console.log(userDataInterface)
        if (statusUpdate === 'online') {
            userDataInterface.hardwareMining[hardwareIndex].status = 'offline'
            userDataInterface.hardwareMining[hardwareIndex].statusColor = 'var(--Offline-Status)'
        } else {
            userDataInterface.hardwareMining[hardwareIndex].status = 'online'
            userDataInterface.hardwareMining[hardwareIndex].statusColor = 'var(--Main-Green)'
        };

        const userID = sessionStorage.getItem('userID')

        axios.put(`http://localhost:4000/users/${userID}`, {
            name: userDataInterface.name,
            login: userDataInterface.login,
            hardwareMining: userDataInterface.hardwareMining
        }).then(res => {
            getUserData();
        })
    };

    // Toggle action to display more details of the mining hardware separately
    const toggleMoreDetails = id => {
        setMoreHardwareDetails(prevShowHardwareDetails => ({
            ...prevShowHardwareDetails,
            [id]: !prevShowHardwareDetails[id]
        }))
    };

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
                    {userHardwareData ?
                        userHardwareData.map((data, index) => {
                            return (
                                <div className={styles.hardwareBlock} key={index}>
                                    <div className={styles.cryptoColor} style={{ backgroundColor: `${data.color}` }}></div>

                                    <div className={styles.hardwareContent}>

                                        <div className={styles.hardwareDetails}>
                                            <h2>
                                                <span style={{ color: `${data.statusColor}` }}>Name: </span>{data.name}
                                            </h2>
                                            <h3>
                                                <span style={{ color: `${data.statusColor}` }} >Blockchain: </span>{data.blockchain}
                                            </h3>
                                        </div>

                                        <div style={{ backgroundColor: `${data.statusColor}` }} className={styles.mobileStatusBall}></div>

                                        <h2 className={styles.desktopStatus}>
                                            STATUS: <span className={styles.statusOnline} style={{ color: `${data.statusColor}` }}>{data.status.toUpperCase()}</span>
                                        </h2>

                                    </div>

                                    {/* Arrow UP/DOWN */}
                                    <IoMdArrowDropdown size={18} onClick={() => toggleMoreDetails(data.id)} />

                                    {/* Display Hardware Details */}
                                    {moreHardwareDetails[data.id] ?
                                        <div className={styles.moreDetailsContainer}>
                                            <div className={styles.hardwareSpecs}>
                                                <h2><span style={{ color: `${data.statusColor}` }}>GPU: </span>{data.gpu}</h2>
                                                <h3><span style={{ color: `${data.statusColor}` }}>ID: </span> {data.id}</h3>
                                            </div>

                                            <div className={styles.totalGainsContainer}>
                                                <div>
                                                    <h2>Total gains in the last 30 days</h2>
                                                    <h3>
                                                        {data.gainsLast30Days}
                                                        <span> $ 80.01 USD</span>
                                                    </h3>
                                                </div>

                                                <h2>All gains are automatically sent to local wallet.</h2>
                                            </div>

                                            <button
                                                onClick={() => updateItem(data.status, index)}
                                                style={{ backgroundColor: data.status === 'online' ? `var(--Offline-Status)` : `var(--Main-Green)` }}
                                                className={styles.stopStartMiningBtn}>
                                                {data.status === 'online' ? 'Stop Mining' : 'Start Mining'}
                                            </button>
                                        </div>
                                        :
                                        null
                                    }

                                </div>
                            )
                        })
                        :
                        <div>Loading...</div>
                    }

                </div>
            </div>
        </>
    )
}