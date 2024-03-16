"use client";

import { useState } from "react";
import styles from "./search.module.css";

const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    
    const handleSearch = async () => {
        const response = await fetch(`/api/search?query=${search}`);
        const data = await response.json();
        setResults(data);
    };
    
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
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                </div>
                <ul>
                    {results.map((result) => (
                    <li key={result.id}>{result.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Search;