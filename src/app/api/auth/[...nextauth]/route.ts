import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Note: For production, configure with real database adapter
// For now, using demo credentials for UI development

const authConfig = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Demo mode: Accept specific credentials
                if (
                    credentials?.email === "sam.sweilem85@gmail.com" &&
                    credentials?.password === "Winter2022$"
                ) {
                    return {
                        id: "admin-1",
                        email: "sam.sweilem85@gmail.com",
                        name: "Sam Sweilem",
                        role: "SUPER_ADMIN",
                    };
                }

                if (
                    credentials?.email === "demo@scalednative.com" &&
                    credentials?.password === "demo123"
                ) {
                    return {
                        id: "demo-1",
                        email: "demo@scalednative.com",
                        name: "Demo User",
                        role: "ORG_ADMIN",
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-change-in-production",
};

const { handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
