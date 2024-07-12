import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  {params: {billboardId}}: {params: {billboardId: string}}
) {
  try {
    if (!billboardId) {
      return new NextResponse('Billboard ID is required', {status: 400});
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error('[BILLBOARD_GET]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {
    params: {storeId, billboardId}
  }: {params: {storeId: string; billboardId: string}}
) {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 401});
    }

    const body = await req.json();
    const {label, imageUrl} = body;

    if (!label) {
      return new NextResponse('Label is required', {status: 400});
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', {status: 400});
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', {status: 400});
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', {status: 400});
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', {status: 403});
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId
      },
      data: {
        label,
        imageUrl
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {
    params: {storeId, billboardId}
  }: {params: {storeId: string; billboardId: string}}
) {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated', {status: 401});
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', {status: 400});
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', {status: 400});
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', {status: 403});
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
