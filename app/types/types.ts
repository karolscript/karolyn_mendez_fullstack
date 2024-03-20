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