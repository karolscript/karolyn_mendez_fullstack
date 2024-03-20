"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import styles from "./artist.module.css";
import { Minus, Plus } from 'akar-icons';
import { getArstistAlbumsAPI, handleAddAlbumAPI, handleRemoveAlbumAPI } from '../../pages/api/search/api';
import { Album, Artist } from '../types/types';

type SearchParams = {
    artistData: string;
}

type AlbumWithUser = {
    album: Album;
    userHasAlbum: boolean;
}

const ArtistDetails = ({searchParams}: {searchParams: SearchParams})  => {
    const session = useSession();
    let { artistData } = searchParams;
    const artist: Artist = JSON.parse(artistData);
    const [monthlyListeners, setMonthlyListeners] = useState("");
    const [albums, setAlbums] = useState<AlbumWithUser[]>();
    const artistImage = artist?.images?.[0]?.url ?? "";

    if(session) {
    } else {
        redirect('/');
    }

    const getArstistAlbums = async (id: string) => {
        const artistAlbums = await getArstistAlbumsAPI(id);
        setAlbums(artistAlbums);
    }

    const getMonthlyListeners = async (id: string) => {
        const url = `https://spotify-artist-monthly-listeners.p.rapidapi.com/artists/spotify_artist_monthly_listeners?spotify_artist_id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
                'X-RapidAPI-Host': 'spotify-artist-monthly-listeners.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setMonthlyListeners(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getArstistAlbums(artist?.id);
    }
    , [artist?.id, session?.data]);

    const handleAddAlbum = async (id: string) => {
        const addAlbumResponse = await handleAddAlbumAPI(id);

        if (addAlbumResponse.ok){
            getArstistAlbums(artist?.id);
        }
    }

    const handleRemoveAlbum = async (id: string) => {
        const removeAlbumRespose = await handleRemoveAlbumAPI(id);

        if (removeAlbumRespose.ok){
            getArstistAlbums(artist?.id);
        }
    }

    return (
    <>
        {artist !== null && <div className={styles.container}>
            <div className={styles.artist}>
                <div className={styles.circular_image}>
                    <img src={artistImage} alt="Artist" className={styles.artistImage}/>
                </div>
                <div className={styles.artistInfo}>
                    <h1 className={styles.artistName}>{artist?.name}</h1>
                    <h6 className={styles.artistFollowers}>{`Followers: ${artist?.followers?.total}`}</h6>
                    <h6 className={styles.artistGenres}>{`Monthly listeners: ${monthlyListeners}`}</h6>
                </div>
            </div>
            <div className={styles.resultsContainer}>
                <div className={styles.resultsHeader}>
                    <span className={styles.resultsTitle}>{`Guarda tus albumes favoritos de ${artist?.name}`}</span>
                </div>
                <ul className={styles.results}>
                    {albums !== null && albums?.map((item) => (
                    <div key={item.album.id} className={styles.album}>
                        <img src={item?.album?.images?.[0]?.url ?? ""} alt={item.album.name} className={styles.albumImage}/>
                        <div className={styles.albumInfo}>
                            <span className={styles.albumName}>{item.album.name}</span>
                            <span className={styles.albumReleaseDate}>{`publicado: ${item.album.release_date}`}</span>
                            <button 
                            className={item.userHasAlbum ? styles.deleteButton : styles.saveButton} 
                            onClick={() =>item.userHasAlbum ? handleRemoveAlbum(item.album.id) : handleAddAlbum(item.album.id)}>
                            {item.userHasAlbum ? <Minus strokeWidth={2} size={16} /> : <Plus strokeWidth={2} size={16} />}
                            <p>{item.userHasAlbum ? 'RemoveAlbum' : 'Add album'}</p>
                            </button>
                        </div>
                    </div>
                    ))}
                </ul>
            </div>
        </div>}
    </>
    );
};

export default ArtistDetails;