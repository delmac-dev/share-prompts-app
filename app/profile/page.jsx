"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileCard from '@components/ProfileCard';

const MyProfile = () => {
    const router = useRouter();
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push('/');
        }
    });
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const fetchPosts = async () => {

            if(!session?.user) return;
            
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
        
            if(response.ok){
                const data = await response.json();
                setPosts(data);
            }
        };
    
        if (session) {
            fetchPosts();
        }
    }, [session]);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    return (
        <ProfileCard
            name="My"
            desc="Welcome to ypur personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
    }

export default MyProfile