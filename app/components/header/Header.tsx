"use client";
import Image from "next/image";
import styles from "./header.module.css";
import { SignOut } from "akar-icons";
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const session = useSession();
    const pathname = usePathname();

    const handleSignOut = () => {
          signOut({ callbackUrl: '/' });
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Image src="/svg/logo.svg" alt="Logo" width={133} height={24} priority />
            </div>
            <div className={styles.iso}>
                <Image className={styles.img} src="/svg/iso.svg" alt="Logo" width={133} height={24} priority />
            </div>
            {session?.status === "authenticated" && <div className={styles.navigation}>
                <a href="/home" className={pathname === "/home" ? styles.active : ""}>Buscar</a>
                <a href="/my-albums" className={pathname === "/my-albums" ? styles.active : ""}>My albums</a>
                <span className={styles.divider}>|</span>
                <a href="/api/auth/signout" onClick={handleSignOut}>
                    <SignOut strokeWidth={2} size={16} className={styles.signOutIcon} />
                    <span className={styles.signOut}>Cerrar sesión</span>
                </a>
            </div>}
        </div>
    );
};

export default Header;