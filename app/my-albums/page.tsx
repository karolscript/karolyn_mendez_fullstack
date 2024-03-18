"use client";
import { useEffect, useState } from "react";
import styles from "./myalbums.module.css";
import { useSession, signIn } from "next-auth/react";
import { Minus } from "akar-icons";
import { redirect } from "next/navigation";

const MyAlbums = () => {
    const session = useSession();
    const [albums, setAlbums] = useState([]);

    if(session) {
        console.log(session)
    } else {
        redirect('/');
    }

    const savedAlbums = async () => {
        const token = session?.data?.accessToken;
        console.log(token);
        const response = await fetch((`https://api.spotify.com/v1/me/albums`), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (!data.error) {
            setAlbums(data.items);
        } else {
            console.error(data.error);
            if (data.error.status === 401) {
                //signIn('spotify');
            }
        }
    }

    useEffect(() => {
        savedAlbums();
    }, [session?.data]);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.text1}>Mis albumes</h1>
                <h1 className={styles.text2}>guardados</h1>
                <span className={styles.text3}>
                    Encuentra tus artistas favoritos gracias a nuestro buscador 
                    y guarda tus álbumes favoritos
                </span>
            </div>
            <div className={styles.resultsContainer}>
                <ul className={styles.results}>
                    {albums !== null && albums?.map((album) => (
                    <div key={album.id} className={styles.album}>
                        {album?.images !== undefined && <img src={album?.images[0]?.url} alt={album.name} className={styles.albumImage}/>}
                        <div className={styles.albumInfo}>
                            <span className={styles.albumName}>{album.name}</span>
                            <span className={styles.albumReleaseDate}>{`publicado: ${album.release_date}`}</span>
                            <button className={styles.deleteButton}>
                                <Minus strokeWidth={2} size={16} />
                                <p>RemoveAlbum</p>
                            </button>
                        </div>
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export  default MyAlbums;