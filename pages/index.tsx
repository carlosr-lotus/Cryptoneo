// import type { NextPage } from 'next'
import { useState } from 'react';
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { FiMenu } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { FaBitcoin, FaEthereum, FaMonero } from 'react-icons/fa';

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
      <main className={styles.mainTag}>

        <div className={styles.getStartedContainer}>
          <div className={styles.getStartedContent}>
            <h1>The new way to mine your favorite Crypto - fast and reliable.</h1>
            <button className={styles.getStartedBtn}>Get Started</button>
          </div>

          {/* Pickaxe SVG */}
          <svg className={styles.pickaxeSvg} width="100%" height="100%" viewBox="0 0 3334 2500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
            {/* Pickaxe */}
            <g>
              <path d="M2084.4,400.311l204.312,198.606l69.446,-57.104l-205.006,-207.94l-68.752,66.438Z" />
              <path d="M2058.71,844.304l73.943,-56.285c-0,0 35.224,-24.648 61.361,-0.893c0,-0 411.725,423.813 480.436,611.463c0,0 1.785,-73.923 -59.036,-215.335c0,-0 -201.506,-409.656 -453.157,-635.415c-0,0 -543.751,-512.92 -869.899,-547.839l95.307,71.372c-0,0 452.044,333.901 513.543,430.854c-0,0 22.258,20.094 -3.986,62.192l-51.701,68.619l213.189,211.267Z" />
              <path d="M320.852,2500l992.76,-1020.49l669.792,-614.16l74.37,-24.132l-213.852,-211.934l-19.128,70.007l-127.438,150.448c0,-0 -251.237,301.959 -302.925,337.21l-469.641,464.415l-738.458,707.982l134.52,140.65Z" fill="#5ab553" />
            </g>
            {/* Rock */}
            <g>
              <path d="M2904.07,2149.42l142.552,-62.537l77.913,116.331c-0,0 38.847,157.942 59.522,183.41c0,-0 4.532,112.655 -19.785,112.655l-66.916,0l-193.286,-349.859Z" fill="#484848" />
              <path d="M2547.28,2016.58l362.157,141.037l138.172,-61.955l-53.174,-63.691c-0,-0 -423.234,-291.52 -480.669,-302.917l-86.159,-11.396l119.673,298.922Z" fill="#5f5f5f" />
              <path d="M2662.06,2499.28l437.39,0l-188.629,-344.431l-248.761,344.431Z" fill="#202020;" />
              <path d="M2662.06,2499.28l248.761,-343.262l-358.543,-141.32l-63.013,262.048l172.795,222.534Z" fill="#303030" />
              <path d="M1926.62,2470.74l565.375,-193.997l170.07,223.253l-659.002,-0.719c-0,0 -65.071,-13.524 -76.443,-28.537Z" fill="#282828" />
              <path d="M1984.61,2124.09l577.84,-115.993l-63.291,266.693l-569.877,197.996c0,0 -52.677,-21.07 -46.854,-100.907c5.822,-79.836 91.457,-239.888 102.182,-247.789Z" fill="#393939" />
              <path d="M1981.01,2128.53l571.273,-113.128l-119.55,-297.753c-0,0 -74.708,9.533 -118.201,49.465l-273.522,279.443l-60,81.973Z" fill="#484848" />
            </g>
          </svg>
        </div>

        {/* *** "Choose your Crypto" *** */}
        <h2 className={styles.divHeaderTitle}>Choose your Crypto</h2>

        <div className={styles.chooseCryptoContainer}>
          <div className={styles.cryptoBox}>
            <h3>Bitcoin</h3>
            <p>(BTC)</p>
            <FaBitcoin fill={'var(--Bitcoin)'} size={120} />
          </div>
          <div className={styles.cryptoBox}>
            <h3>Ethereum</h3>
            <p>(ETH)</p>
            <FaEthereum fill={'var(--Ethereum)'} size={120} />
          </div>
          <div className={styles.cryptoBox}>
            <h3>Monero</h3>
            <p>(XMR)</p>
            <FaMonero fill={'var(--Monero)'} size={120} />
          </div>
          <h3>And many more...</h3>
        </div>

      </main>
    </div>
  )
}
