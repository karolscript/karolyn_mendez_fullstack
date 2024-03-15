import Image from "next/image";
import styles from "./header.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Image src="/svg/logo.svg" alt="Logo" width={133} height={24} priority />
            </div>
        </div>
    );
};

export default Header;