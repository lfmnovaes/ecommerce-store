import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  {params: {storeId}}: {params: {storeId: string}}
) {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 401});
    }

    const body = await req.json();
    const {name} = body;

    if (!name) {
      return new NextResponse('Name is required', {status: 400});
    }

    if (!storeId) {
      return new NextResponse('Store id is required', {status: 400});
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error('[STORE_PATCH]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params: {storeId}}: {params: {storeId: string}}
) {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!storeId) {
      return new NextResponse('Store id is required', {status: 400});
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error('[STORE_DELETE]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
