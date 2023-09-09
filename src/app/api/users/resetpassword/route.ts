import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { password, token } = await request.json();

    console.log("Password: ", password);
    console.log("token: ", token);

    const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

    if (!user) {
        return NextResponse.json({error: "User not found"}, {
            status: 400
        })
    }

    console.log(user);

    // hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
        message: "password reset success",
        success: true
    })

  } catch (error) {
    
  }
}
