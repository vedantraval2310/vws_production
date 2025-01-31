import { NextResponse } from 'next/server'
import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/site', '/api/uploadthing'],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    const url = req.nextUrl
    //console.log(url)
    const searchParams = url.searchParams.toString()
    //console.log(searchParams)
    let hostname = req.headers
    //console.log(hostname)
    const pathWithSearchParams = `${url.pathname}${
        searchParams.length > 0 ? `?${searchParams}` : ''
      }`
  
      //if subdomain exists
      const customSubDomain = hostname
        .get('host')
        ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
        .filter(Boolean)[0]
  
      if (customSubDomain) {
        return NextResponse.rewrite(
          new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
        )
      }
  
      if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
      }
  
      if (
        url.pathname === '/' ||
        (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
      ) {
        return NextResponse.rewrite(new URL('/site', req.url))
      }
  
      if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
      ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
      }
      
    },
  //rewriting the domain url for the dynamic urls

  ignoredRoutes: ['/no-auth-in-this-route'],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};