import {auth} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  {params: {storeId}}: {params: {storeId: string}}
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', {status: 403});
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error('[BILLBOARDS_POST]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

export async function GET(
  req: Request,
  {params: {storeId}}: {params: {storeId: string}}
) {
  try {
    if (!storeId) {
      return new NextResponse('Store ID is required', {status: 400});
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId
      }
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
