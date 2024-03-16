"use client"
import styles from "./landing.module.css";
import { ArrowRight } from 'akar-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

const Landing = () => {
    const session = useSession();
    
    const handleLogin = () => {
        signIn('spotify')
    }

    if(session) {
        console.log(session);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('session', JSON.stringify(session.data));
          } 
        redirect('/home');
    }

    return (
        <div className={styles.container}>
            <div className={styles.landing}>
                <div className={styles.arrowContainer}>
                    <img 
                        src="/svg/arrow.svg" 
                        alt="Arrow" 
                        className={styles.arrow}
                         />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.text1}>Disfruta de la</h1>
                    <h1 className={styles.text2}>mejor música</h1>
                    <h6 className={styles.text3}>Accede a tu cuenta para escuchar tus albumes favoritos</h6>
                    <div className={styles.login}>
                        <a className={styles.text4} href="/api/auth/signin" onClick={handleLogin}>Login con Spotify</a>
                        <ArrowRight color="#FFFFFF"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;