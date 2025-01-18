import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: "Message must be atleast 10 character long"})
        .max(300, {message: "Message must be atmost 300 character long"})
});