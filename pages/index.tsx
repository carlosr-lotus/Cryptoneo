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

      {/* *** Index Page Header *** */}
      <header>
        <nav
          className={mobileMenu ? styles.headerContainerMobile : styles.headerContainer}>
          <h1 className={styles.headerLogo}>Cryptoneo</h1>

          {/* Menu Icon only on Mobile */}
          <div className={styles.mobileMenuIcon} onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <IoCloseSharp size={30} /> : <FiMenu size={25} />}
          </div>

          {/* Mobile Menu Display on menu icon click */}
          {mobileMenu ?
            <>
              <ul>
                <li><a href="/">Home</a></li>
                <li>Mining</li>
                <li>About</li>
              </ul>

              <button className={styles.loginButton}>Login</button>
            </>
            :
            ''
          }

          {/* Desktop Menu Display */}
          <ul className={styles.navbarDesktop}>
            <li><a href="/">Home</a></li>
            <li>Mining</li>
            <li>About</li>
          </ul>

          <button className={styles.loginButtonDesktop}>Login</button>

        </nav>
      </header>

      {/* *** Index Page Main Content *** */}
      <main>
        <h1>The new way to mine your favorite Crypto - fast and reliable.</h1>
      </main>
    </div>
  )
}
