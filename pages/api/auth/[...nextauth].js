import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXT_PUBLIC_AUTH_SECRET;

console.log(nextAuthSecret)

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: spotifyClientId,
      clientSecret: spotifyClientSecret,
      id: "spotify",
      name: "Spotify",
      type: "oauth",
      authorization: {
        params: {
          scope: "user-read-email user-read-private user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify",
        },
       },
      token: "https://accounts.spotify.com/api/token",
      userinfo: "https://api.spotify.com/v1/me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        }
      },
      session: {
        jwt: true,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: nextAuthSecret,
});

async function refreshAccessToken(token) {
  const url = `https://accounts.spotify.com/api/token`;
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);
  params.append("client_id", spotifyClientId);
  params.append("client_secret", spotifyClientSecret);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")}`,
    },
    body: params,
  });
 
  return await response.json();
}

const checkTokenExpired = (date) => {
  const tokenExpiryDate = new Date(date);
  const currentTime = new Date(Date.now());
  console.log("tokenExpiryDate", tokenExpiryDate)
  console.log("currentTime", currentTime)
  return tokenExpiryDate < currentTime;
}