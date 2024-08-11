import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = (req: any, res: any) => {
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          console.log("credentials", credentials);
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log("user", user);

          if (
            !user ||
            !(await bcrypt.compare(credentials.password, user.password))
          ) {
            return null;
          }

          return { id: user.id.toString(), name: user.name, email: user.email };
        },
      }),
    ],
    pages: {
      signIn: "/login",
      error: "/login", // Error page URL
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token }) {
        if (token && session.user) {
          session.user.id = token.id as string; // Ensure the ID is treated as a number
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id as string; // Store ID as a number after proper type assertion
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure you have this in your .env file
  });
};

export { handler as GET, handler as POST };

