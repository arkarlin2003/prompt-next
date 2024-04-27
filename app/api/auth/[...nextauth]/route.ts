import { connectToDB } from "@/config/database";
import User from "@/models/user";
import NextAuth, { Account, Profile } from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session }) {
      //   // store the user id from MongoDB to session
      //   const sessionUser = User.findOne({
      //     email: session.user.email,
      //   });
      //   session.user.id = sessionUser._id.toString();
      return session;
    },
    signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      try {
        connectToDB();

        // check if user already exists
        const userExists = User.findOne({ email: profile?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          User.create({
            email: profile?.email,
            username: profile?.name.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
