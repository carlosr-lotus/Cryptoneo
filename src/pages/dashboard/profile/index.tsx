import Head from "next/head"
import { useEffect, useState } from "react";

// Packages
import axios from "axios";

// Components
import DashboardSideBar from "../../../components/dashboardSidebar"

// CSS
import styles from '../../../styles/pages/DashboardProfile.module.css';

interface userData {
    name: string,
    login: string
}

export default function ProfileTab() {

    const [userData, setUserData] = useState<userData>()

    useEffect(() => {
        const userID = sessionStorage.getItem('userID')

        axios.get(`http://localhost:4000/users/${userID}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard | Profile</title>
            </Head>

            <DashboardSideBar />


            <div className={styles.dashProfileContainer}>
                <div></div>

                {userData ?
                    <div className={styles.dashProfileContent}>

                        <div className={styles.profileContainer}>

                            {/* <div className={styles.profilePhoto}></div> */}

                            <form className={styles.userProfileForm}>
                                <input type="text" defaultValue={userData.name} disabled />
                                <input type="text" defaultValue={userData.login} disabled />
                                <input type="password" defaultValue="***" disabled />

                                <button>Save Changes</button>
                            </form>
                        </div>

                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}