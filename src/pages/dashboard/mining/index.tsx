import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Packages
import axios from "axios";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";

// Components
import DashboardSideBar from "../../../components/dashboardSidebar";

// Icons
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { GrFormAdd } from 'react-icons/gr';

import styles from "../../../styles/pages/DashboardMining.module.css";

interface userDataInterface {
    id: number,
    name: string,
    login: string,
    hardwareMining: [any]
}

interface addHardwareInterface {
    id: string,
    name: string,
    gpu: string,
    blockchain: string,
    status: string,
    statusColor: string,
    gainsLast30Days: string,
    color: string
}

export default function MiningTab() {

    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const [userDataInterface, setUserDataInterface] = useState<userDataInterface>();
    const [addHardwareInterface, setAddHardwareInterface] = useState<addHardwareInterface>();
    const [userHardwareData, setUserHardwareData] = useState([]);
    const [moreHardwareDetails, setMoreHardwareDetails] = useState({});

    useEffect(() => {
        getUserData()
    }, []);

    // GET request to DB to get user data //
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

    // PUT request to DB to update item //
    function updateItem(statusUpdate, hardwareIndex) {

        if (statusUpdate === 'online') {
            userDataInterface.hardwareMining[hardwareIndex].status = 'offline'
            userDataInterface.hardwareMining[hardwareIndex].statusColor = 'var(--Offline-Status)'
        } else {
            userDataInterface.hardwareMining[hardwareIndex].status = 'online'
            userDataInterface.hardwareMining[hardwareIndex].statusColor = 'var(--Main-Green)'
        };

        const userID = sessionStorage.getItem('userID')

        axios.put(`http://localhost:4000/users/${userID}`, {
            id: userDataInterface.id,
            name: userDataInterface.name,
            login: userDataInterface.login,
            hardwareMining: userDataInterface.hardwareMining
        }).then(res => {
            getUserData();
        })
    };

    // POST request to add new hardware //
    function addNewHardware(newData) {

        const remainingData = {
            id: (Math.floor(Math.random() * 100000000000)).toString(),
            name: newData.name,
            gpu: newData.gpu,
            blockchain: newData.blockchain,
            status: 'offline',
            statusColor: 'var(--Offline-Status)',
            gainsLast30Days: '0',
            color: `var(--${newData.blockchain.charAt(0).toUpperCase() + newData.blockchain.slice(1)})`
        }

        userDataInterface.hardwareMining.push(remainingData);

        const userID = sessionStorage.getItem('userID');

        axios.put(`http://localhost:4000/users/${userID}`, {
            id: userDataInterface.id,
            name: userDataInterface.name,
            login: userDataInterface.login,
            hardwareMining: userDataInterface.hardwareMining,
        }).then(res => {
            getUserData();
            console.log(res);
        })
    }

    // Toggle action to display more details of the mining hardware separately //
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
                    <div className={styles.miningPageHeader}>
                        <h1>Mining Hardware</h1>
                    </div>

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
                                                <span style={{ color: `${data.statusColor}` }} >Blockchain: </span>{data.blockchain.charAt(0).toUpperCase() + data.blockchain.slice(1)}
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

                    {/* Modal to add new hardware for the logged user */}
                    <Popup
                        trigger={<h2 className={styles.addHardwareTrigger}>+</h2>}
                        position="center center"
                        arrow={false}
                        closeOnDocumentClick
                        contentStyle={{
                            backgroundColor: 'var(--Background-Color-Darker)',
                            overflowY: 'scroll',
                            padding: '1rem',
                            borderRadius: '5px',
                            textAlign: 'center',
                            display: 'grid',
                            fontSize: '1.2rem',
                            color: 'var(--Main-White)',
                            width: '100%',
                            maxWidth: '80%',
                            maxHeight: '90vh',
                        }}
                        overlayStyle={{
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            padding: '1rem'
                        }}
                    >
                        <h1>Add Hardware</h1>

                        <form className={styles.formAddHardware} onSubmit={handleSubmit(addNewHardware)}>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input type="text" {...register('name')} required />

                            <br />

                            <label>GPU</label>
                            <br />
                            <select className={styles.selectOptionAddHardware} {...register('gpu')}>
                                <option value="RTX 3090 24GB">RTX 3090 24GB</option>
                                <option value="RTX 3080 10GB">RTX 3080 10GB</option>
                                <option value="RTX 3070 TI 8GB">RTX 3070 TI 8GB</option>
                                <option value="RTX 3060 12GB">RTX 3060 12GB</option>
                                <option value="RTX 3050 8GB">RTX 3050 8GB</option>
                            </select>

                            <br />

                            <label>Blockchain Network</label>
                            <br />
                            <select className={styles.selectOptionAddHardware} {...register('blockchain')}>
                                <option value="bitcoin">Bitcoin</option>
                                <option value="ethereum">Ethereum</option>
                                <option value="monero">Monero</option>
                            </select>

                            <br />
                            <button type="submit" className={styles.addHardwareBtn}>Add Hardware</button>
                        </form>

                    </Popup>

                </div>
            </div>
        </>
    )
}