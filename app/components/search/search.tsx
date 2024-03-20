"use client";

import { useEffect, useState } from "react";
import { getAlbumsAPI, getArtistDataAPI } from "../../../pages/api/search/search";
import styles from "./search.module.css";
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from "next/link";
import { Artist } from "../../types/types";

type SearchResult = {
    albums: {
        items: {
            id: string;
            name: string;
            images: { url: string }[];
            artists: { name: string; id: string }[];
        }[];
    }; 
}


const Search = () => {
    const session = useSession();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({} as SearchResult);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; 
    const resultsSize = (results?.albums?.items.length || 0) as number;
    const totalPages = Math.ceil(resultsSize / pageSize) || 0;
    
    if(session) {
        console.log(session?.data?.user);
        console.log(session?.data);
    } else {
        redirect('/');
    }
    
    const handleSearch = async (artist: string) => {
        setCurrentPage(1);
        getAlbums(artist);
    };

    const getAlbums = async (artist: string) => {
        const artistData = await getAlbumsAPI(artist);
        setResults(artistData);
    }

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, results?.albums?.items.length);
        return results?.albums?.items.slice(startIndex, endIndex);
    };

    const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
    }

    const renderPagination = () => {
    return (
        <div className={styles.paginationContainer}>
        <button className={styles.pageNumber} disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
        </button>
        {pageNumbers.map((pageNumber) => (
            <button
            key={pageNumber}
            className={pageNumber === currentPage ? `${styles.pageNumber} ${styles.activePage}` : styles.pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            >
            {pageNumber}
            </button>
        ))}
        <button className={styles.pageNumber} disabled={currentPage === totalPages} onClick={handleNextPage}>
            Next
        </button>
        </div>
    );
    };

    const currentItems = getCurrentPageItems();
    
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.text1}>Busca tus</h1>
                <h1 className={styles.text2}>artistas</h1>
                <span className={styles.text3}>
                    Encuentra tus artistas favoritos gracias a nuestro buscador 
                    y guarda tus álbumes favoritos
                </span>
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <input
                        className={styles.searchInput}
                        placeholder="Nirvana"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button 
                        className={styles.searchButton} 
                        onClick={() => handleSearch(search)}
                        disabled={session.status !== 'authenticated'}
                        >
                            Search
                    </button>
                </div>
            </div>
            <div className={styles.resultsContainer}>
                <div className={styles.resultsHeader}>
                    {resultsSize> 0 && <span className={styles.resultsTitle}>{`Mostrando 4 resultados de ${resultsSize}`}</span>}
                </div>
                <ul className={styles.results}>
                    {currentItems?.map((album) => (
                        <Album album={album} key={album.id} />
                    ))}
                    
                </ul>
                {totalPages > 1 && renderPagination()}
            </div>
        </div>
    );
};

export default Search;

const Album = ({album}: {album: any}) => {
    const [artist, setArtist] = useState<Artist>();
    const session = useSession();

    const getArtistData = async (id: string) => {
        const artistData = await getArtistDataAPI(id);

        if (!artistData.error) {
            setArtist(artistData);
        } else {
            console.error(artistData.error);
            if (artistData.error.status === 401) {
                signIn('spotify');
            }
        }
    }

    useEffect(() => {
        getArtistData(album.artists[0].id);
    }, [session?.data, album.artists[0].id]);

    return (
        <div key={album.id} className={styles.album}>
            <img src={album.images[0].url} alt={album.name} className={styles.albumImage}/>
            <div className={styles.albumInfo}>
                <Link
                    className={styles.artistName}
                    href={{
                        pathname: '/artist/',
                        query: {
                            artistData: JSON.stringify(artist),
                        }
                    }}
                    >
                        {album.artists[0].name}
                </Link>
                <span className={styles.followers}>Followers: {artist?.followers?.total}</span>
            </div>
        </div>
    )

}