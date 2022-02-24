import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserData } from "../../login";
import DashboardSideBar from "../../../components/dashboardSidebar";

import styles from "../../../styles/pages/DashboardCurrency.module.css";

interface UserDataProps {
    data: UserData
}

export default function CurrencyTab(props: UserData) {

    const dataPropsTest = props;
    const [crypto, setCrypto] = useState([]);

    // Get Coingecko API to display crypto pricing list
    useEffect(() => {
        console.log(dataPropsTest);
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then((res) => {
                setCrypto(res.data);
            }).catch((res) => {
                console.log(res);
            })
    }, []);

    return (
        <>
            <Head>
                <title>Cryptoneo | Currency</title>
            </Head>

            <div className={styles.dashCurrencyContainer}>
                <DashboardSideBar pageName={"currency"} />

                <div className={styles.dashCurrencyContent}>

                    {/* Crypto Table Content */}
                    {crypto ?
                        <>
                            <div className={styles.tableHeader}>
                                <h1>Name</h1>
                                <h1>Price</h1>
                            </div>

                            {crypto.map((data, index) => {
                                return (
                                    <div key={index} className={styles.listCryptoData}>
                                        <h2>
                                            <img src={data.image} />
                                            {data.name} ({data.symbol.toUpperCase()})
                                        </h2>
                                        <h2>${data.current_price} <span>usd</span></h2>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <div className={styles.loadingContainer}>
                            <h1 className={styles.loadingWarning}>Loading...</h1>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}