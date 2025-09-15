import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const users = await dbconnect("users");
        const user = await users.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // If logging in with Credentials, user already has role
      if (user) {
        token.role = user.role;
      }

      // If logging in with Google, fetch user from DB
      if (!token.role) {
        const users = await dbconnect("users");
        const dbUser = await users.findOne({ email: token.email });

        // If new Google user, assign default role "explorer"
        if (!dbUser) {
          await users.insertOne({
            name: token.name,
            email: token.email,
            role: "explorer",
            provider: "google",
            createdAt: new Date(),
          });
          token.role = "explorer";
        } else {
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
