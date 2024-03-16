"use client";

import { useState } from "react";
import styles from "./search.module.css";

const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; 
    const resultsSize = results?.albums?.items.length || 0;
    const totalPages = Math.ceil(resultsSize / pageSize) || 0;
    let session = {};
    
    //check if local storage is defined
    if (typeof localStorage === 'undefined') {
        console.log('Local storage is not defined');
    } else {
        console.log('Local storage is defined');
        const sessionString = localStorage.getItem('session');
        session = JSON.parse(sessionString as string);
    }
    

    console.log(session);

    const handleSearch = async (artist: string) => {
        //const response = await fetch(`/api/search?query=${search}`);
        //const data = await response.json();
        getAlbums(artist);
        //setResults(data);
    };

    const getAlbums = async (artist: string) => {
        console.log(artist);
        const artistData = await fetch('https://api.spotify.com/v1/search?' + new URLSearchParams({
            q: artist,
            type: 'album',
        }), {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }});
        //const response = await fetch(`/api/albums?artistId=${artist}`);
        const data = await artistData.json();
        setResults(data);
        console.log(data);
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
    
      const pageNumbers = [];
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
                    <button className={styles.searchButton} onClick={() => handleSearch(search)}>Search</button>
                </div>
            </div>
            <div className={styles.resultsContainer}>
                <div className={styles.resultsHeader}>
                    {resultsSize> 0 && <span className={styles.resultsTitle}>{`Mostrando 4 resultados de ${resultsSize}`}</span>}
                </div>
                <ul className={styles.results}>
                    {currentItems?.map((album) => (
                    <div key={album.id} className={styles.album}>
                        <img src={album.images[0].url} alt={album.name} className={styles.albumImage}/>
                        <h1 className={styles.artistName}>{album.artists[0].name}</h1>
                    </div>
                    ))}
                    
                </ul>
                {totalPages > 1 && renderPagination()}
            </div>
        </div>
    );
};

export default Search;