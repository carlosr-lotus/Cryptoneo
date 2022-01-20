import type { NextPage } from 'next'
import { useState } from 'react';
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { FiMenu } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';

export default function Home() {

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className={styles.homepageContainer}>
      <Head>
        <title>Cryptoneo | Home</title>
      </Head>

      <nav className={mobileMenu ? styles.headerContainerMobile : styles.headerContainer}>
        <h1 className={styles.headerLogo}>Cryptoneo</h1>

        <div className={styles.mobileMenuIcon} onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <IoCloseSharp size={30} /> : <FiMenu size={25} />}
        </div>

        {/* Mobile Menu Display */}
        {mobileMenu ?
          <>
            <ul>
              <li><a href="/about">Home</a></li>
              <li>Mining</li>
              <li>About</li>
            </ul>

            <button className={styles.loginButton}>Login</button>
          </>
          :
          ''
        }
      </nav>

      <h2 className={styles.teste}>apenas um teste</h2>
    </div>
  )
}
