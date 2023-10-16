import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from  "scenes/widgets/PostWidget.jsx";

export const PostsWidget=({userId,isProfile=false})=>{
    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    const token=useSelector((state)=>state.token);
    const [reload,forceReload]=useState(false);


    const Reload=()=>forceReload(!reload);//just use it for rerendering

    const getPosts=async ()=>{
        //console.log("Here");
        const response=await fetch("http://localhost:3001/posts",{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        });
        const data=await response.json();
        if(Array.isArray(data))
        {
            dispatch(setPosts({posts:data}));
        }
        
    }
    const getUserPosts=async ()=>{
        const response=await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        });
        const data=await response.json();
        if(Array.isArray(data.posts))
        {
            console.log(data.posts);
            dispatch(setPosts({posts:data.posts}));
        }
        
    }
    useEffect(()=>{
        if(isProfile)
        {
            getUserPosts();
        }
        else
        {
            getPosts();
        }
        
    },[])
    return <>
    {
        (posts.map(({
            _id,
            userId,
            firstname,
            lastname,
            description,
            location,
            picturepath,
            userpicturepath,
            likes,
            comments,   
        },i)=>{
            //console.log(posts[i]);
            return <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstname} ${lastname}`}
            description={description}
            location={location}
            picturepath={picturepath}
            userPicturePath={userpicturepath}
            likes={likes}
            comments={comments}
            >
            </PostWidget>
        }))
    }
    </>
}
export default PostsWidget;
