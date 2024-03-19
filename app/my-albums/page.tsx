"use client";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react";
import styles from "./myalbums.module.css";
import { useSession, signIn } from "next-auth/react";
import { Minus } from "akar-icons";
import { redirect } from "next/navigation";

const MyAlbums = () => {
    const session = useSession();
    const [albums, setAlbums] = useState([]);
    const [albumsByArtist, setAlbumsByArtist] = useState({});

    if(session) {
    } else {
        redirect('/');
    }

    const savedAlbums = async () => {
        const token = session?.data?.accessToken;

        const response = await fetch((`https://api.spotify.com/v1/me/albums`), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();

        const albumsByArtist = data?.items?.reduce((acc: { [x: string]: any[]; }, album: { album: { artists: { name: any; }[]; }; }) => {
            const artistName = album.album.artists[0].name;
            if (!acc[artistName]) {
              acc[artistName] = [];
            }
            acc[artistName].push(album);
            return acc;
          }, {});

        if (!data.error) {
            setAlbums(data.items);
            setAlbumsByArtist(albumsByArtist);
        } else {
            console.error(data.error);
            if (data.error.status === 401) {
                //signIn('spotify');
            }
        }
    }

    const handleRemoveAlbum = async (id: string) => {
        const token = session?.data?.accessToken;

        const response = await fetch((`https://api.spotify.com/v1/me/albums?ids=${id}`), {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok){
            savedAlbums();
        }
    }

    useEffect(() => {
        console.log(session)
        session?.data !== undefined && savedAlbums();
    }, [session?.data]);

    const renderAlbums = (albums: any[] | null) => {
        return(
            <ul className={styles.results}>
                {albums !== null && albums?.map((item: { album: { id: Key | null | undefined; images: { url: string | undefined; }[] | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; release_date: any; }; }) => (
                <div key={item.album.id} className={styles.album}>
                    {item.album?.images !== undefined && <img src={item.album?.images[0]?.url} alt={item.album.name as string} className={styles.albumImage}/>}
                    <div className={styles.albumInfo}>
                        <span className={styles.albumName}>{item.album.name}</span>
                        <span className={styles.albumReleaseDate}>{`publicado: ${item.album.release_date}`}</span>
                        <button className={styles.deleteButton} onClick={() => handleRemoveAlbum(item.album.id as string)}>
                            <Minus strokeWidth={2} size={16} />
                            <p>RemoveAlbum</p>
                        </button>
                    </div>
                </div>
                ))}
            </ul>
        );
    };

    const renderAlbumsByArtist = () => {
        return (
            <ul className={styles.results}>
                {Object.keys(albumsByArtist).map((artist) => (
                    <div key={artist}>
                        <h2 className={styles.artistName}>{artist}</h2>
                        {renderAlbums(albumsByArtist[artist])}
                    </div>
                ))}
            </ul>
        )
    };

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
                <div className={styles.onlyAlbums}>
                    {renderAlbums(albums)}
                </div>
                 <div className={styles.albumsByArtist}>
                    {renderAlbumsByArtist()}
                </div>
            </div>
        </div>
    );
};

export  default MyAlbums;