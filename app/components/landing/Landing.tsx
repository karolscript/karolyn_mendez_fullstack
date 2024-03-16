"use client"
import styles from "./landing.module.css";
import { ArrowRight } from 'akar-icons';
import { signIn } from 'next-auth/react'

const Landing = () => {
    const handleLogin = () => {
        signIn('spotify', { callbackUrl: 'http://localhost:3000/home' })
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
                        <button className={styles.text4} onClick={handleLogin}>Login con Spotify</button>
                        <ArrowRight color="#FFFFFF"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;