import { getSession } from "next-auth/react";
import { Album, CustomSession } from "../../../app/types/types";

export const getAlbumsAPI = async (
    artist: string,
    ) => {
        const session: CustomSession | null= await getSession();
        const artistData = await fetch('https://api.spotify.com/v1/search?' + new URLSearchParams({
            q: artist,
            type: 'album',
        }), {
                headers: {
                    Authorization: `Bearer ${session?.user?.accessToken}`,
            }});
        const data = await artistData.json();
        return data;
}

export const getArtistDataAPI = async (id: string) => {
    const session: CustomSession | null= await getSession();
    const artistData = await fetch((`https://api.spotify.com/v1/artists/${id}`), {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            }});

    const data = await artistData.json();

    return data;
}

export const getArstistAlbumsAPI = async (id: string) => {
    const session: CustomSession | null= await getSession();
    const fetchedAlbums = await fetch((`https://api.spotify.com/v1/artists/${id}/albums`), {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        }
    });

    const resData = await fetchedAlbums.json();
    const data = resData.items;

    const albums = await Promise.all(data.map(async (album: { id: string }) => {
        const response = await fetch((`https://api.spotify.com/v1/me/albums/contains?ids=${album.id}`),
         {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            }
        });
        const albumData = await response.json();

        return {album, userHasAlbum: albumData[0]};
      }));

    return albums;
}

export const handleAddAlbumAPI = async (id: string) => {
    const session: CustomSession | null= await getSession();
    const response = await fetch((`https://api.spotify.com/v1/me/albums?ids=${id}`), {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        }
    });

    return response;
}

export const handleRemoveAlbumAPI= async (id: string) => {
    const session: CustomSession | null= await getSession();

    const response = await fetch((`https://api.spotify.com/v1/me/albums?ids=${id}`), {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        }
    });

    return response;
}

export const getSavedAlbumsAPI = async () => {
    const session: CustomSession | null= await getSession();

    const response = await fetch((`https://api.spotify.com/v1/me/albums`), {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            }
        });
    return response;
}