import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        if (!params.id) {
            return res.status(400).send('Missing ID parameter');
        }

        const user = await User.find({
            _id: params.id
        });

        if(!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 });
    }catch (error) {
        console.log(error);
        return new Response("There was a problem fetching prompts", { status: 500 });
    }
}