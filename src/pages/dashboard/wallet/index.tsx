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
    acronym: string,
    cryptoColor: string,
    currentAmount: string,
    currentAmountConverted: string,
    cryptoDesc: string,
}

export default function WalletTab() {

    const [walletData, setWalletData] = useState([]);
    const [walletDataPopup, setWalletDataPopup] = useState<walletDataModal>();
    const [open, setOpen] = useState(false);
    const [openReceive, setOpenReceive] = useState(false);
    const [openSend, setOpenSend] = useState(false);

    const closeModal = () => setOpen(false);
    const closeModalReceive = () => setOpenReceive(false);
    const closeModalSend = () => setOpenSend(false);

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
                                    <div
                                        className={styles.walletBlock}
                                        key={index}
                                        onClick={() => returnWalletModal(data)}
                                    >
                                        {returnCryptoIcon(data.crypto, data.cryptoColor)}

                                        <div className={styles.walletDetails}>
                                            <h2>{data.crypto.charAt(0).toUpperCase() + data.crypto.slice(1)} ({data.acronym})</h2>

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
                    {walletDataPopup ?
                        <Popup
                            open={open}
                            onClose={closeModal}
                            position="top center"
                            arrow={false}
                            // closeOnDocumentClick
                            contentStyle={{
                                backgroundColor: 'var(--Background-Color-Darker)',
                                overflowY: 'scroll',
                                padding: '2rem',
                                borderRadius: '5px',
                                textAlign: 'center',
                                display: 'grid',
                                fontSize: '1.2rem',
                                color: 'var(--Main-White)',
                                width: '100%',
                                maxWidth: '50rem',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                            overlayStyle={{
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                padding: '1rem'
                            }}
                        >
                            <div className={styles.popupWalletContainer}>

                                <div className={styles.popupWalletTopContent}>
                                    {returnCryptoIcon(walletDataPopup.crypto, walletDataPopup.cryptoColor)}

                                    <div>
                                        <h1>{walletDataPopup.crypto.charAt(0).toUpperCase() + walletDataPopup.crypto.slice(1)} ({walletDataPopup.acronym}) </h1>
                                        <div>
                                            <p>{walletDataPopup.currentAmount}</p>
                                            <span>$ {walletDataPopup.currentAmountConverted} USD</span>
                                        </div>
                                    </div>

                                    <div className={styles.popupWalletBtns}>
                                        <button onClick={() => setOpenReceive(o => !o)} className={styles.receiveWalletBtn}>Receive</button>
                                        <button className={styles.sendWalletBtn} onClick={() => setOpenSend(o => !o)}>Send</button>
                                    </div>
                                </div>

                                <div className={styles.popupWalletMainContent}>

                                    {/* Crypto Current Price */}
                                    <div className={styles.popupWalletMainBlockPrice}>
                                        <h2>{walletDataPopup.crypto.charAt(0).toUpperCase() + walletDataPopup.crypto.slice(1)} Current Value</h2>
                                        <h3>1 {walletDataPopup.acronym} = $<span>42276.88 </span><span>USD</span></h3>
                                    </div>

                                    {/* Wallet Transfer History */}
                                    <div className={styles.popupWalletMainBlockHistory}>
                                        <h2>History</h2>

                                        <div>
                                            <p>
                                                <span style={{ color: 'var(--Yellow)' }}>Received</span> 0.0001 <span>$ 4.03 USD</span>
                                            </p>

                                            <p>Mining Fee</p>
                                        </div>

                                        <div>
                                            <p>
                                                <span style={{ color: 'var(--Main-Green)' }}>Sent</span> 0.00093120 <span>$ 40.01 USD</span>
                                            </p>

                                            <p>Receiver address: miEfU8FsvLGgzQpQUYLtB6rPLHwn9YG56w</p>
                                        </div>

                                        <div>
                                            <p>
                                                <span style={{ color: 'var(--Yellow)' }}>Received</span> 0.0001 <span>$ 4.03 USD</span>
                                            </p>

                                            <p>Mining Fee</p>
                                        </div>


                                    </div>

                                    {/* Crypto Description */}
                                    <div className={styles.popupWalletMainBlockDesc}>
                                        <p>{walletDataPopup.cryptoDesc}</p>
                                    </div>

                                </div>
                            </div>
                        </Popup>
                        :
                        null
                    }

                    {/* Receive Crypto Modal */}
                    <Popup
                        open={openReceive}
                        onClose={closeModalReceive}
                        position="top center"
                        arrow={false}
                        closeOnDocumentClick
                        contentStyle={{
                            backgroundColor: 'var(--Background-Color-Darker)',
                            overflowY: 'scroll',
                            padding: '2rem',
                            borderRadius: '5px',
                            textAlign: 'center',
                            display: 'grid',
                            fontSize: '1.6rem',
                            color: 'var(--Main-White)',
                            width: '100%',
                            maxWidth: '50rem',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                        overlayStyle={{
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            padding: '1rem'
                        }}
                    >
                        <p>Your address:</p>
                        <p>miEfU8FsvLGgzQpQUYLtB6rPLHwn9YG56w</p>
                    </Popup>

                    {/* Send Crypto Modal */}
                    <Popup
                        open={openSend}
                        onClose={closeModalSend}
                        position="top center"
                        arrow={false}
                        closeOnDocumentClick
                        contentStyle={{
                            backgroundColor: 'var(--Background-Color-Darker)',
                            overflowY: 'scroll',
                            padding: '2rem',
                            borderRadius: '5px',
                            textAlign: 'center',
                            display: 'grid',
                            fontSize: '1.6rem',
                            color: 'var(--Main-White)',
                            width: '100%',
                            maxWidth: '50rem',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                        overlayStyle={{
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            padding: '1rem'
                        }}
                    >
                        <p>Receiver address: </p>
                        <input type="text"></input>

                        <p>Amount: </p>
                        <input type="text"></input>

                        <button className={styles.modalSentBtn}>Send Crypto</button>
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
                            maxWidth: '50rem',
                            maxHeight: '90vh',
                            transition: '0.25s all ease-in-out',
                        }}
                        overlayStyle={{
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            padding: '1rem'
                        }}
                    >
                        <h1>Generate Wallet</h1>
                        <select className={styles.generateWalletSelect}>
                            <option>Monero</option>
                            <option>Bitcoin</option>
                            <option>Ethereum</option>
                        </select>
                    </Popup>
                </div>
            </div>
        </>
    )
}