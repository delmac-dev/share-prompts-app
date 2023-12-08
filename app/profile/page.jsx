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

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(!hasConfirmed) return;

        try {
            await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE'
            });

            setPosts(posts.filter((data) => data._id !== post._id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProfileCard
            name="My"
            desc="Welcome to your personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
    }

export default MyProfile