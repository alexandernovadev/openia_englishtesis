// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET || "micsecretjwtfa";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/auth')) {
    if (token) {
      try {
        // Verificar el token
        await jwtVerify(token, new TextEncoder().encode(secret));
        // Si el token es válido y está intentando acceder a una ruta de autenticación, redirigir a la página principal
        url.pathname = '/';
        return NextResponse.redirect(url);
      } catch (error) {
        // Si el token es inválido, permitir el acceso a las rutas de autenticación
        return NextResponse.next();
      }
    } else {
      // No hay token, permitir el acceso a las rutas de autenticación
      return NextResponse.next();
    }
  }

  if (!token) {
    // No hay token, redirigir al login
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  try {
    // Verificar el token
    await jwtVerify(token, new TextEncoder().encode(secret));
    // Token válido, permitir acceso
    return NextResponse.next();
  } catch (error) {
    // Token inválido, redirigir al login
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
