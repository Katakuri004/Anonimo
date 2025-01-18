import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';


export async function POST(request: Request){
    await dbConnect()

    try{
       const {username , email ,password} = await request.json()

       const exisitingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerfied: true
       })

       if(exisitingUserVerifiedByUsername){
           return Response.json({
               success: false,
               message: 'Username already exists'
           },{status : 400})
       }

       const existingUserByEmail = await UserModel.findOne({email});

       const verfiyCode = Math.floor(100000 + Math.random()*900000).toString();

       if(existingUserByEmail){
          if (existingUserByEmail){
            if(existingUserByEmail.isVerfied){
                return Response.json({
                    success: false,
                    message: 'User Already exists with this email'
                },{status: 400})
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verfiyCode = verfiyCode;
                existingUserByEmail.verfiyCodeExpire = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
          }
       } else {
        const hashedPassword = await bcrypt.hash(password, 10) 
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        const newUser = new UserModel({
                username,
                email,  
                password: hashedPassword,
                verfiyCode,
                verfiyCodeExpire: expiryDate,
                isVerfied: false,
                isAcceptingMessage : true,
                messages: [],
            
        }) 
        await newUser.save()
       }

       //send Verification Email
       
       const emailResponse = await sendVerificationEmail(
        email, 
        username,
        verfiyCode
    )
    if (emailResponse.success){
        return Response.json({
            success: false,
            message: emailResponse.message
        },{status: 500})
    }

    return Response.json({
        success: true,
        message: "User registered successfully. Please verify your email"},{status: 201})

    }catch(error){
        console.error('error registering user', error)  
        return Response.json(
            {
                success: false,
                error: 'An error occured while registering user'
            },
            {
                status: 500

            }
        )
    }
}