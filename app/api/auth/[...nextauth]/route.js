import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import {connectDb} from "@/app/helper/db";
import {User} from "@/app/models/user";
import {NextResponse} from "next/server";


const authOptions={

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks:{
        async signIn({user,account}){
            if(account.provider === 'google') {

                const {name, email, image} = user;
                try {

                    connectDb();


                    const userExists = await User.findOne({email});

                    if(!userExists) {
                        const user=await new User({
                            name,
                            email,
                            secure_url:image

                        });
                        try {
                            console.log(user);

                            const createdUser=await user.save();
                            const response=NextResponse.json(user,{
                                status:201
                            });
                            return response;



                        }
                        catch (e) {
                            console.log(e);
                            return NextResponse.json({

                                message:"failed to create user!!",
                                status:false,
                            })

                        }


                    }
                    else{

                    }


                }
                catch (e){
                    console.log(e)

                }
            }
            console.log(user)

            return true;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("---- getting token");


            return token;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };