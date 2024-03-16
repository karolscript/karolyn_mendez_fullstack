import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: "2f9ddd1a533a4a0791c6047ec02f13bb",
      clientSecret: "e6262fe13f6d43bcb65acf88ab3663d0",
      scope: ["user-read-email", "user-read-private", "user-library-read", "user-library-modify", "playlist-read-private", "playlist-modify-public", "playlist-modify-private", "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing", "user-read-recently-played", "user-top-read", "user-read-playback-position", "user-read-recently-played", "user-follow-read", "user-follow-modify"],
      token: "https://accounts.spotify.com/api/token",
      userinfo: "https://api.spotify.com/v1/me",
      type: "oauth",
      authorization:
      "https://accounts.spotify.com/authorize?scope=user-read-email",
      profile(profile) {
        console.log("profile", profile)
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
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  secret: process.env.SECRET,
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

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  return await response.json();
}
