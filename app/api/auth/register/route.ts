import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username,
            }
        })

        const emailFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (usernameFound) {
            return NextResponse.json({
                message: 'Username already exists',

            }, {
                status: 400
            })
        }

        if (emailFound) {
            return NextResponse.json({
                message: 'Email already exists',

            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        });


        const { password: _, ...user } = newUser

        return NextResponse.json(user);
    } catch (error: unknown) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        )

    }
}