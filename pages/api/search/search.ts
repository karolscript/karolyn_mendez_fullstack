import { getSession } from "next-auth/react";
import { CustomSession } from "../../../app/types/types";

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