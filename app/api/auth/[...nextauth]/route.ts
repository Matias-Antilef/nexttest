import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'email' },
                password: { label: 'password', type: 'password', placeholder: '*******' }
            },
            async authorize(credentials, req) {

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    }
                })

                if (!userFound) throw new Error('User not found');

                const matchPassword = await bcrypt.compare(String(credentials?.password), userFound.password)

                if (!matchPassword) throw new Error('Wrong password');

                return {
                    id: userFound.id,
                    username: userFound.username,
                    email: userFound.email
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }