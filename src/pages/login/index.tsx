import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import styles from '../../styles/pages/Login.module.css';

export default function Login() {

    const router = useRouter();
    const { register, handleSubmit } = useForm();

    function submitLogin(paramsData) {
        console.log(paramsData);

        axios.get('http://localhost:4000/users/', {
            params: {
                login: paramsData.email
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.length == 1) {
                    console.log('Login sucessful!')

                    router.push({
                        pathname: '/dashboard/currency',
                        query: {
                            loginUser: res.data[0].login,
                            userName: res.data[0].name,
                        }
                    })
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