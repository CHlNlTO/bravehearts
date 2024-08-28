import NextAuth, {
  NextAuthOptions,
  Session,
  User,
  DefaultSession,
  DefaultUser,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

// Extend the Session type
interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// Extend the User type
interface ExtendedUser extends User {
  id: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email } = user;
        if (!email?.endsWith("@firstasia.edu.ph")) {
          return "/auth/error?error=AccessDenied";
        }

        try {
          // Check if user exists in Supabase
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select()
            .eq("email", email)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error fetching user:", fetchError);
            return false;
          }

          if (!existingUser) {
            // Generate a new UUID for Supabase
            const supabaseId = uuidv4();

            // Create new user in Supabase
            const { error: insertError } = await supabase.from("users").insert({
              id: supabaseId,
              email: email,
              name: user.name,
              handle: `@${user.name
                ?.toString()
                .toLowerCase()
                .replace(/\s/g, "")}`,
              google_id: user.id,
            });

            if (insertError) {
              console.error("Error creating user in Supabase:", insertError);
              return false;
            }

            // Update the user object with the new Supabase ID
            (user as ExtendedUser).id = supabaseId;
          } else {
            // If user exists, use the Supabase ID
            (user as ExtendedUser).id = existingUser.id;
          }

          return true;
        } catch (error) {
          console.error("Unexpected error during sign in:", error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as ExtendedUser).id;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Use a custom error page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
