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
    const [user, setUser] = useState('');

    useEffect(()=>{
        if(!userID) router.push('/');

        const fetchPosts = async () => {
            
            const response = await fetch(`/api/users/${userID}`);
        
            if(response.ok){
                const data = await response.json();
                setUser(data[0]);
                if(data.length > 0) {
                    let postResponse = await fetch( `/api/users/${userID}/posts`);
    
                    if(postResponse.ok){
                        let postData = await postResponse.json();
                        setPosts(postData);
                    };
                }
            };

        };
    
        if (userID) {
            fetchPosts();
        }
    },[userID]);


  return (
    <>
        {user && (
            <ProfileCard
            name={user.username}
            desc={`Welcome to ${user.username} personalised profile page`}
            data={posts}
            />
        )}
    </>
  )
};

export default OtherProfile;