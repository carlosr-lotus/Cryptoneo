import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import styles from '../../styles/pages/Signup.module.css';

export default function SignUp() {

    const router = useRouter();
    const { register, handleSubmit } = useForm();

    function submitLogin(data) {
        console.log(data);

        // router.push({
        //     pathname: '/login'
        // })
    }

    return (
        <div className={styles.signupPageContainer}>
            <Head>
                <title>Cryptoneo | Signup</title>
            </Head>
            <h1 className={styles.headerLogo}>Cryptoneo</h1>

            <div className={styles.signupFormContainer}>
                <form className={styles.formTag} onSubmit={handleSubmit(submitLogin)}>
                    <label htmlFor="name">Name*</label>
                    <br />
                    <input id="name" type="text" {...register('name')} required />

                    {/* Email */}
                    <label htmlFor="email">Email*</label>
                    <br />
                    <input id="email" type="email" {...register('email')} required />
                    <br />

                    {/* Password */}
                    <label htmlFor="password">Password*</label>
                    <br />
                    <input id="password" type="password" {...register('password')} required />
                    <br />

                    {/* Confirm Password */}
                    <label htmlFor="confirmPassword">Confirm Password*</label>
                    <br />
                    <input id="confirmPassword" type="password" {...register('confirmPassword')} required />
                    <br />

                    <div className={styles.mobilePrivacyText}>
                        <p>
                            This simple?
                            <br />
                            Yes, we respect user's <span>privacy</span>.
                        </p>
                    </div>
                    <a>
                        <button type="submit" className={styles.createAccountBtn}>Create Account</button>
                    </a>

                </form>

                <div className={styles.separateLine}>

                </div>

                <div className={styles.desktopPrivacyText}>
                    <p>
                        This simple?
                        <br />
                        Yes, we respect user's <span>privacy</span>.
                    </p>
                </div>
            </div >
        </div>
    )
}