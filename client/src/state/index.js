import { createSlice } from "@reduxjs/toolkit";
const initialstate={
    mode:"light",
    user:{},
    token:null,
    posts:[],
    fullfriends:[]
};

export const authslice=createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
        setMode:(state)=>{
            state.mode=state.mode==="light"?"dark":"light";
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
            state.fullfriends=null;
        },
        setFriends:(state,action)=>{
            if(state.user.friends)
            {
                state.user.friends=action.payload.friends;
                state.fullfriends=action.payload.fullfriends;
            }
            else
            {
                console.log("User does not exist");
            }
        },
        setFullFriends:(state,action)=>{
            state.fullfriends=action.payload.fullfriends;
        },
        setPosts:(state,action)=>{
            //console.log(action.payload.posts);
            state.posts=action.payload.posts;
        },
        pushToPosts:(state,action)=>{
            state.posts.push(action.payload.postnew);
            console.log(state.posts);
        },
        setPost:(state,action)=>{
            const updatedposts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id)
                {
                    return action.payload.post;
                }
                return post;
            })
            state.posts=updatedposts;
        }
    }
});

export const{setMode,setFriends,setLogin,setPost,setPosts,setFullFriends,pushToPosts,setLogout}=authslice.actions;
export default authslice.reducer;
