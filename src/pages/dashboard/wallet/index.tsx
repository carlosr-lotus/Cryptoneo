import Head from "next/head"
import DashboardSideBar from "../../../components/dashboardSidebar"

import styles from "../../../styles/pages/DashboardWallet.module.css";

export default function WalletTab() {
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