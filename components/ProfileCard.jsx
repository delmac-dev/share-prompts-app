

import PromptCard from "./PromptCard";

const ProfileCard = ({name,desc,data,handleEdit,handleDelete}) => {
  const handleTagClick = () => {

  }

  return (
    <section className="w-full flex flex-col items-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post = {post}
            handleTagClick={handleTagClick}
            handleEdit={()=>handleEdit(post)}
            handleDelete={()=>handleDelete(post)}
          />
        ))} 
    </div>
    </section>
  )
}

export default ProfileCard
