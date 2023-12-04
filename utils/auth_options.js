import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user'
import {connectToDB} from '@utils/database'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })],
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();   
        },
        async signIn({profile}) {
            try {
                await connectToDB();

                const userExists = await User.findOne({email: profile.email});  
                if(!userExists) {
                    const user = new User({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    });
                    await user.save();
                }

                return true;
            }catch (error) {
                console.log(error); 
                console.log("erorr here");
                return false;

            }
        }
}