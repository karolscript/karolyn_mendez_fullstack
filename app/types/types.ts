import { DefaultSession } from "next-auth";

interface User {
    name?: string | null;
    email?: string | null;
    accessToken?: string | null;
}

export interface CustomSession extends Omit<DefaultSession, "user"> {
    user?: User;
    expires: string;
}

export interface Artist {
    id: string;
    name: string;
    images?: [Image];
    followers?: {
      total: number;
    };
    genres?: [string];
};

interface Image {
    height: number | null;
    url: string | null;
    width: number | null;
}

export interface Album {
    id: string;
    name: string;
    artists: [Artist];
    images?: [Image];
    album_type?: string;
    release_date?: string;
    tracks?: {
      total: number;
      items: Track[];
    };
}

export interface Track {
    id: string;
    name: string;
    album: Album;
    artists: [Artist];
    duration_ms: number;
    preview_url: string;
}

export interface SavedAlbumByArtist {
    [key: string]: SavedAlbum[];
}

export interface SavedAlbum {
    added_at: string;
    album: Album;
}