import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser{
    id: string;
    email: string;
    name: string;
    image?: string | null;
    emailVerified: Date | null;
    role: string;
    // password?: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: string;
  }
}
