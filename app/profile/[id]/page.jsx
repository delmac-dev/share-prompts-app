"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import ProfileCard from '@components/ProfileCard';


const OtherProfile = () => {
    const router = useRouter();
    const params = useParams();
    const { id:userID } = params;
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        if(!userID) router.push('/');

        const fetchPosts = async () => {

            console.log(userID);
            
            const response = await fetch(`/api/users/${userID}`);
        
            if(response.ok){
                const data = await response.json();
                log
                setUser(data);
            };

            if(user) {
                let response = await fetch(`/api/users/${userID}/posts`);

                if(response.ok){
                    let data = await response.json();
                    setPosts(data);
                };
            }
        };
    
        if (userID) {
            fetchPosts();
        }
    }, [userID]);


  return (
    <ProfileCard
        name={user?.username || "Name"}
        desc={`"Welcome to ${user.username} personalised profile page"`}
        data={posts}
    />
  )
}

export default OtherProfile;