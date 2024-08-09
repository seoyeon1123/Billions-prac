import { NextRequest } from 'next/server';
import getSession from './lib/session';

interface IRoutes {
  [key: string]: boolean;
}

const publicUrl: IRoutes = {
  '/': true,
  '/sign-up': true,
};

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const exits = publicUrl[request.nextUrl.pathname];

  if (!session.id) {
    if (!exits) {
      return Response.redirect(new URL('/', request.url));
    }
  } else {
    if (exits) {
      return Response.redirect(new URL('/home', request.url));
    }
  }
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
