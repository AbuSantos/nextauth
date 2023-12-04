import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    //the create user page can only be accessed by the admin

    if (
      req.nextUrl.pathname.startsWith("/createUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      //they're authorized if theyve a token and its not null
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/createUser"] };
