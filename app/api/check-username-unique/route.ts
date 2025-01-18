import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import UserModel from "@/model/User";

const UsernameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(request: Request){

    if(request.method !== 'GET'){
        return Response.json({
            success: false,
            message: 'Method Not allowed',
        },{status: 405})
    }
    await dbConnect();
    
    try{
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        //validation with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        if(!result.success){
            const usernameErrors = result.error.format().
                username?._errors || []
                return Response.json({
                    success: false,
                    message: usernameErrors?.length > 0 
                    ?usernameErrors.join(', ')
                    :'Invalid query parameters',
                }),{status : 400}
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerfied: true})

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message:'username is taken!'
            },{status: 400})
        }
        return Response.json({
            success: true,
            message: 'Username is available'
        })

        

    }catch(error){
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
}