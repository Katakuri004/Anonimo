// import OpenAI from 'openai';
// import { streamText, LanguageModelV1 } from 'ai'; // Import the type if available
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const responseStream = await openai.completions.create({
//       model: 'gpt-3.5-turbo',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = streamText({
//       model: 'gpt-3.5-turbo' as LanguageModelV1, // Ensure correct type
//       prompt,
//       stream: responseStream,
//     });

//     return stream.toDataStreamResponse();
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       console.error('An unexpected error occurred:', error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'An unexpected error occurred. Please try again later.',
//         },
//         { status: 500 }
//       );
//     }
//   }
// }
