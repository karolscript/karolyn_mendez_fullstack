import NextAuth from 'next-auth';
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: "2f9ddd1a533a4a0791c6047ec02f13bb",
      clientSecret: "e6262fe13f6d43bcb65acf88ab3663d0",
      scope: 'user-read-email',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
        };
      }
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    async redirect(url, baseUrl) {
      console.log(url)
      return url
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    },
  },
});
