import {NextResponse} from "next/server";

export function middleware(request){
    console.log("middleware executed");

    const loginToken=request.cookies.get("next-auth.session-token") ?.value;

    if(request.nextUrl.pathname === "/api/auth" ){
        return
    }

    const loggedInUserNotAccessPaths = request.nextUrl.pathname ==="/Login";

    if(loggedInUserNotAccessPaths){
        if(loginToken){

            return  NextResponse.redirect(new URL('/',request.url));
        }
    }
    else{
        if(!loginToken){
            if(request.nextUrl.pathname.startsWith("/api")  && !request.nextUrl.pathname.startsWith("/api/auth")){
                return NextResponse.json({
                    message:"Access Denied!!!",
                    success:false
                },{
                    status:401
                })
            }
            else if(request.nextUrl.pathname.startsWith("/api/auth")){
                return
            }
            return NextResponse.redirect(new URL('/Login',request.url));
        }
    }


}

export const config={

    matcher:['/','/Login','/api/:path*','/Home','/Dashboard',]

}