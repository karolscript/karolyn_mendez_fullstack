import Link from "next/link";
import styles from "./landing.module.css";
import { ArrowRight } from 'akar-icons';

const Landing = () => {
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
                        <Link href="/login" className={styles.text4}>Login con Spotify</Link>
                        <ArrowRight color="#FFFFFF"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;