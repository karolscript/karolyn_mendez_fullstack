import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: "2f9ddd1a533a4a0791c6047ec02f13bb",
      clientSecret: "e6262fe13f6d43bcb65acf88ab3663d0",
    }),
  ],
  secret: process.env.SECRET,
})