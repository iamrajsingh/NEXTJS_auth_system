import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest){

    try {
        
        const {email} = await request.json();
        console.log(email);
        
        const user = await User.findOne({email});
        console.log("User", user);

        if (!user) {
            return NextResponse.json({error: "User not found"}, {
                status: 400
            })
        }


        await sendEmail({email, emailType: "RESET", userId: user._id});

        return NextResponse.json({
            message: "Email Sent",
            success: true,
          });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }

}