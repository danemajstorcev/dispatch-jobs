import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const DEMO_USERS = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', password: 'demo1234', role: 'jobseeker' },
  { id: '2', name: 'Sam Torres',  email: 'sam@example.com',  password: 'demo1234', role: 'employer'  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages:   { signIn: '/auth/signin' },
  session: { strategy: 'jwt' },
  secret:  process.env.NEXTAUTH_SECRET ?? 'dispatch-jobs-dev-secret-change-in-production',
};
