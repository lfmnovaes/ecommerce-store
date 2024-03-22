import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const body = await req.json();
    const {name} = body;

    if (!name) {
      return new NextResponse('Bad Request', {status: 400});
    }

    const organization = await prismadb.organization.create({
      data: {
        name: name,
        ownerId: userId
      }
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('[ORGANIZATION_POST]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
