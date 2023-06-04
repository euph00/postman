import bcrypt from 'bcrypt';
import rsa from 'js-crypto-rsa';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            email, 
            name, 
            password
        } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const key = await rsa.generateKey(2048);
        const publicKey = key.publicKey;
        const privateKey = key.privateKey;

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponse("Internal Error", { status: 500 })
    }
}