import { GoogleGenerativeAI } from "@google/generative-ai";

console.log('Google API Key:', process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
console.log(process.env); 

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);

export default ai;
