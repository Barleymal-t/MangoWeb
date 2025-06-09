import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        AppleProvider({
            clientId: process.env.APPLE_ID ?? "",
            clientSecret: process.env.APPLE_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!passwordMatch) {
                    return null;
                }

                return user;
            },
        }),
    ],

    pages: {
        signIn: "/auth/signin", // your custom page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
