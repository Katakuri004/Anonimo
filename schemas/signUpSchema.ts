import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast 2 characters long")
    .max(20 , "username must be atmost 20 characters long")
    .regex(/^[a-zA-Z0-9_]*$/, "username can only contain alphabets, numbers and underscore");


    export const signUpSchema = z.object({
        username : usernameValidation,
        email    : z.string().email({message: "Invalid email address"}),  
        password : z.string().min(6, {message: "Password must be atleast 6 characters long"}),
    })
