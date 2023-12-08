"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState(false); 
    const router = useRouter();
    const {data: session} = useSession({
        required:true,
        onUnauthenticated(){
            router.push('/');
        }
    })
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const searchParams = useSearchParams();
    const promptID = searchParams.get('id');

    useEffect(()=> {

        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptID}`);

            if(response.ok) {
                const {prompt, tag} = await response.json(); 
                setPost({
                    prompt, tag
                });
            }
        };

        if(promptID) {
            fetchPrompt();
        }

    }, [promptID]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptID) return alert('Prompt ID not found');

        try{
            const response = await fetch(`/api/prompt/${promptID}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }
        }catch (error) {
            console.log(error);
        }finally {
            setSubmitting(false);
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt