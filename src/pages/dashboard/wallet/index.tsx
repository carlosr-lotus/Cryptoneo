import Head from "next/head"
import { useRouter } from "next/router";

// Packages
import axios from "axios";
import Popup from "reactjs-popup";

// Icons
import { FaBitcoin, FaEthereum, FaMonero } from 'react-icons/fa';

// Components
import DashboardSideBar from "../../../components/dashboardSidebar"

import styles from "../../../styles/pages/DashboardWallet.module.css";
import { useEffect, useState } from "react";

interface walletDataModal {
    crypto: string,
    cryptoColor: string,
    currentAmount: string,
    currentAmountConverted: string,
    cryptoDesc: string,
}

export default function WalletTab() {

    const [walletData, setWalletData] = useState([]);
    const [walletDataPopup, setWalletDataPopup] = useState<walletDataModal>();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    // const { query } = useRouter();
    // console.log(query);

    // Get user wallet data
    useEffect(() => {
        console.log('You got it, baby.');

        const userID = sessionStorage.getItem('userID');

        axios.get(`http://localhost:4000/users/${userID}`)
            .then((res) => {
                console.log(res.data.wallets);
                setWalletData(res.data.wallets);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    // Function that returns modal + wallet details
    function returnWalletModal(paramsData) {
        setWalletDataPopup(paramsData);
        setOpen(o => !o);
        console.log(walletDataPopup);
    }

    // Function that returns crypto icon base on param 'name'
    function returnCryptoIcon(name, color) {
        switch (name) {
            case 'bitcoin':
                return <FaBitcoin size={40} fill={color} />
            case 'ethereum':
                return <FaEthereum size={40} fill={color} />
            case 'monero':
                return <FaMonero size={40} fill={color} />
        }
    }

    return (
        <>
            <Head>
                <title>Cryptoneo | Wallet</title>
            </Head>

            <DashboardSideBar />

            <div className={styles.dashWalletContainer}>
                <div></div>

                <div className={styles.dashWalletContent}>

                    <div className={styles.walletPageHeader}>
                        <h1>Wallet</h1>
                    </div>

                    <div className={styles.walletBlockContainer}>
                        {walletData ?
                            walletData.map((data, index) => {
                                return (
                                    <div className={styles.walletBlock} key={index} onClick={() => returnWalletModal(data)}>
                                        {returnCryptoIcon(data.crypto, data.cryptoColor)}

                                        <div className={styles.walletDetails}>
                                            <h2>{data.crypto.charAt(0).toUpperCase() + data.crypto.slice(1)}</h2>

                                            <div>
                                                <p>{data.currentAmount}</p>
                                                <span>$ {data.currentAmountConverted} USD</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <h1>No wallet found.</h1>
                        }
                    </div>

                    {/* Popup with wallet details */}
                    <Popup
                        open={open}
                        onClose={closeModal}
                        position="top center"
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
                        <div className={styles.popupWalletContainer}>
                            <h1>Bitcoin!</h1>

                            <div>
                                <p>0.00183040</p>
                                <span>$ 80.01 USD</span>
                            </div>

                            <button>Receive</button>
                            <button>Send</button>
                        </div>
                    </Popup>


                    {/* Add Crypto Wallet Popup */}
                    <Popup
                        trigger={<h2 className={styles.addHardwareTrigger}>+</h2>}
                        position="top center"
                        arrow={false}
                        className={styles.popupContent}
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
                            // webkitTransition: '0.25s all ease-in-out',
                            // mozTransition: '0.25s all ease-in-out',
                            // oTransition: '0.25s all ease-in-out',
                            transition: '0.25s all ease-in-out',
                        }}
                        overlayStyle={{
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            padding: '1rem'
                        }}
                    >
                        <h1>Add Wallet</h1>
                        <h1>Hello there!</h1>
                        <h1>Hello there!</h1>
                        <h1>Hello there!</h1>
                        <h1>Hello there!</h1>
                    </Popup>
                </div>
            </div>
        </>
    )
}