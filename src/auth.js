import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import PostgresAdapter from "@auth/pg-adapter";
import { db } from "./db";

export const { auth, handlers, signOut, signIn } = NextAuth({
  adapter: PostgresAdapter(db),
  providers: [GitHub],
  trustHost: true,
  callbacks: {
    session: async ({ sessions, user }) => {
      sessions.user.id = user.id;
      return sessions;
    },
  },
});
