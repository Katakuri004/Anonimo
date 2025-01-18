import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { date } from "zod";

export async function POST(request: Request){
    await dbConnect()

    try{

        const { username , code }= await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username : decodedUsername})

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },{
                    status: 500
                }
            )
        }

        const isCodeValid = user.verfiyCode === code;
        const isCodeNotExpired = new Date(user.verfiyCodeExpire) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerfied = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "Account Verified"
                },{
                    status: 200
                }
            )


        } else if(!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message: "Verification Code has expired. Please sign up again "
                },{
                    status: 400
                }
            )

        }else{
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification Code"
                },{
                    status: 400
                }
            )
        }

    }catch(error){
        console.error("Error verifying username" ,  error)

        return Response.json(
            {
                success: false,
                message: "Error verifying username"
            },{
                status: 500
            }
        )
    }
}
