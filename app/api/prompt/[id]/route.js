import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, {params}) => {

    if (!params.id) {
        return new Response('Missing ID parameter', {status: 400})
    }
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response('Prompt Not Found', {status: 404})
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    }catch (error) {
        console.error(error);
        return new Response("There was a problem fetching the prompt", { status: 500 });

    }
}

// PATCH
export const PATCH = async (req, {params}) => {
    const { prompt, tag } = await req.json();

    if(!params.id) return new Response('Missing Parameter ID', {status: 400});

    if(!prompt && !tag) return new Response('Invalid Data', {status: 400});
    
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response('Prompt To Edit Not Found', {status: 404});
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    }catch(error) {
        console.error(error);
        return new Response("There was a problem updating the prompt", { status: 500 });
 
    }

}

// DELETE
export const DELETE = async (req, {params}) => {

    if(!params.id) return new Response('Missing Parameter ID', {status: 400});

    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt Delete Successful", { status: 200 });
    }catch (error) {
        console.error(error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}