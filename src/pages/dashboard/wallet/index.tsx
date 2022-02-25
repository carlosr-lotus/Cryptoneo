import Head from "next/head"
import DashboardSideBar from "../../../components/dashboardSidebar"
import { useRouter } from "next/router";

import styles from "../../../styles/pages/DashboardWallet.module.css";

export default function WalletTab() {

    // const { query } = useRouter();
    // console.log(query);

    return (
        <>
            <Head>
                <title>Cryptoneo | Wallet</title>
            </Head>

            <div className={styles.dashWalletContainer}>
                <DashboardSideBar />
                <h1>My Crypto wallet is here somewhere...</h1>
            </div>
        </>
    )
}