"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePage = () => {
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
    })

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userID: session?.user.id
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePage