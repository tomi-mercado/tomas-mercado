import { NextMiddleware } from 'next/server';

let locales = ['en', 'es'];

export const middleware: NextMiddleware = (request) => {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect if there is no locale
  const defaultLocale = 'en';
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
