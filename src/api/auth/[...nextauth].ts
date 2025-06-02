// import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export const authOptions = {
    providers: [
        AppleProvider({
            clientId: process.env.APPLE_ID ?? "",
            clientSecret: process.env.APPLE_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
};
