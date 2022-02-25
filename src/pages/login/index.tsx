import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../../styles/pages/Login.module.css';

export interface UserData {
    name: string,
    email: string,
    password: string,
    hardwareMining?: [],
}

export default function Login() {

    const [userDataDB, setUserDataDB] = useState<[UserData]>();
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const userLoginSession = sessionStorage.getItem('login');

        if (userLoginSession) {
            axios.get('http://localhost:4000/users', {
                params: {
                    login: userLoginSession
                }
            }).then(res => {
                console.log(res.data);
                setUserDataDB(res.data);
                sessionStorage.setItem('userID', res.data[0].id);

                router.push({
                    pathname: '/dashboard/currency',
                    query: {
                        userID: sessionStorage.getItem('userID')
                    }
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }, [])

    function submitLogin(paramsData) {

        const userLogin = paramsData.email;

        axios.get('http://localhost:4000/users/', {
            params: {
                login: userLogin
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.length == 1) {

                setUserDataDB(res.data[0]);
                sessionStorage.setItem('login', res.data[0].login);
                sessionStorage.setItem('userID', res.data[0].id);

                router.push({
                    pathname: '/dashboard/currency',
                    query: {
                        userID: res.data[0].id
                    }
                });
            } else {
                console.log('Error! Login not found!');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className={styles.loginPageContainer}>
            <Head>
                <title>Cryptoneo | Login</title>
            </Head>

            <h1 className={styles.headerLogo}>Cryptoneo</h1>

            <div className={styles.loginFormContainer}>
                <form className={styles.formTag} onSubmit={handleSubmit(submitLogin)}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input id="email" type="email" {...register('email')} required />
                    <br />

                    <label htmlFor="password">Password</label>
                    <br />
                    <input id="password" type="password" {...register('password')} required />

                    <br />
                    <a>
                        <button type="submit" className={styles.signInBtn}>Sign In</button>
                    </a>

                    <p>Don't have an account?</p>
                    <Link href="/signup">
                        <button type="button" className={styles.signUpBtn}>Sign Up</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}