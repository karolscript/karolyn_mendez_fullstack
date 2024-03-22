"use client";

import Image from "next/image";
import styles from "./header.module.css";
import { SignOut } from "akar-icons";
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { Snackbar } from "../utils/Snackbar";

const Header = () => {
    const session = useSession();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [online, setOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : false);
    const [activePath, setActivePath] = useState(typeof window !== 'undefined' ? window.location.pathname : "");

    const handleSignOut = () => {
      signOut({ callbackUrl: '/' });
    }

    useEffect(() => {
        window.addEventListener('online', () => setOnline(true));
        window.addEventListener('offline', () => setOnline(false));
    
        return () => {
          window.removeEventListener('online', () => setOnline(true));
          window.removeEventListener('offline', () => setOnline(false));
        };
      }, []);
    
      useEffect(() => {
        if (!online) {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }
      }, [online]);

      useEffect(() => {
        const onLocationChange = () => {
          setActivePath(window.location.pathname);
        };
    
        window.addEventListener('popstate', onLocationChange);
    
        return () => {
          window.removeEventListener('popstate', onLocationChange);
        };
      }, []);

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Image src="/svg/logo.svg" alt="Logo" width={133} height={24} priority />
            </div>
            <div className={styles.iso}>
                <Image className={styles.img} src="/svg/iso.svg" alt="Logo" width={133} height={24} priority />
            </div>
            {session?.status === "authenticated" ? <div className={styles.navigation}>
                <a href="/home" className={pathname === "/home" || activePath === '/home' ? styles.active : ""}>Buscar</a>
                <a href="/my-albums" className={pathname === "/my-albums" || activePath === '/my-albums' ? styles.active : ""}>My albums</a>
                <span className={styles.divider}>|</span>
                <a href="/api/auth/signout" onClick={handleSignOut}>
                    <SignOut strokeWidth={2} size={16} className={styles.signOutIcon} />
                    <span className={styles.signOut}>Cerrar sesión</span>
                </a>
            </div> : <div className={styles.navigation}>
                <a href="/" className={styles.login}>Login</a>
            </div>
            }
            <Snackbar
                message={online ? "Conexión establecida" : "Sin conexión"}
                open={open}
                onClose={() => setOpen(false)}
                error={!online}
            />
        </div>
    );
};

export default Header;