import GitHubProvider from "next-auth/providers/github";
import User from '@models/user'
import {connectToDB} from '@utils/database'

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session?.user?.email
            })
            
            if (sessionUser) session.user.id = sessionUser._id.toString();

            return session
        },
        async signIn({profile}) {
            try {
                await connectToDB();

                const userExists = await User.findOne({email: profile.email});  
                if(!userExists) {
                    const user = new User({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.avatar_url,
                    });
                    await user.save();
                }

                return true;
            }catch (error) {
                return false;

            }
        }
    }
    }