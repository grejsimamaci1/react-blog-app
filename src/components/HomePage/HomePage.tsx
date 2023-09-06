// import React, { useState } from 'react';
// import { Button, Typography, Grid, Card, CardContent, CardActions, Avatar } from '@mui/material';
// import { Link } from 'react-router-dom';
// import CreatePostModal from '../CreatePostModal';
// import { HomePageProps, Post } from '../types';



// const HomePage:  React.FC<HomePageProps<Post>> = ({dummyPosts, setDummyPosts}) => {
  

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleEditPost = (postId: number, updatedPost: Partial<Post>) => {
//     setDummyPosts((prevPosts) =>
//       prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
//     );
//   };

//   const handleRemovePost = (postId: number) => {
//     setDummyPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//   };

//   const handleAddPost = (newPost: { title: string; content: string }) => {
//     setDummyPosts((prevPosts) => [
//       ...prevPosts,
//       {
//         id: prevPosts.length + 1,
//         title: newPost.title,
//         content: newPost.content,
//         author: {
//           id: 103,
//           name: 'New Author',
//           photo: 'https://example.com/new-author-profile.jpg',
//           accountPlan: 'Premium',
//         },
//         comments: [],
//       },
//     ]);
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//         <Typography variant="h6">Click here to add a new post:</Typography>
//         <Button variant="contained" onClick={openModal} style={{ marginLeft: '10px' }}>
//           Add
//         </Button>
//       </div>
//       <Grid container spacing={2}>
//         {dummyPosts.map((post) => (
//           <Grid item xs={12} sm={6} md={6} key={post.id} style={{ display: 'flex', justifyContent: 'center' }}>
//             <Card
//               style={{
//                 width: '90%',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <CardContent>
//                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                   <Avatar src={post.author.photo} alt={post.author.name} />
//                   <div style={{ marginLeft: '10px' }}>
//                     <Typography variant="subtitle1">{post.author.name}</Typography>
//                     <Typography variant="caption">{post.author.accountPlan}</Typography>
//                   </div>
//                 </div>
//                 <h3>{post.title}</h3>
//                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                   <div>
//                     <Button onClick={() => handleEditPost(post.id, { title: 'Updated Title' })}>Edit</Button>
//                     <Button onClick={() => handleRemovePost(post.id)}>Remove</Button>
//                   </div>
//                 </div>
//                 <p>{post.content}</p>
//                 <Typography variant="caption" style={{ color: 'gray' }}>
//                   Comments {post.comments.length}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
//                   <Button>View more</Button>
//                 </Link>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <CreatePostModal isOpen={isModalOpen} onClose={closeModal} onCreatePost={handleAddPost} />
//     </div>
//   );
// };

// export default HomePage;


//redux
import { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, Avatar, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreatePostModal from '../CreatePostModal';
import { useDispatch, useSelector } from 'react-redux'; 
import { logout} from '../../redux/authSlice'
import { HomePageProps, Post } from '../types';
import { addPost, removePost, editPost } from '../../redux/postsSlice';

const HomePage: React.FC<HomePageProps<Post>> = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean, user: { name: string } | null } }) => state.auth.isAuthenticated
)

const posts = useSelector((state: { posts: Post[]}) => state.posts);
// console.log('postsssssssssss', posts)

 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
const [editingPostId, setEditingPostId] = useState<number | null>(null);
const [updatedContent, setUpdatedContent] = useState(""); 

const handleEditPost = (postId: number) =>{
  setEditingPostId(postId);
}

const handleSavePost = (postId: number, updatedContent: string) =>{
  dispatch(editPost({ postId, updatedContent}));
  setEditingPostId(null);
}

const handleCancelEdit = () =>{
  setEditingPostId(null);
}

const handleRemovePost = (postId: number) =>{
  dispatch(removePost(postId));
}

const handleAddPost = (newPost: { title: string; content: string}) => {
  console.log('handle add post called', newPost);
  dispatch(addPost(newPost))
}
const handleLogout = () => {
  dispatch(logout());
  navigate('/');
};

 
  return (
    <div>
      {isAuthenticated && (
        <div>
          <Button variant="contained" onClick={handleLogout} style={{justifyContent: 'flex-end', display: 'flex'}}>
            Logout
          </Button>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h6">Click here to add a new post:</Typography>
            <Button variant="contained" onClick={openModal} style={{ marginLeft: '10px' }}>
              Add
            </Button>
          </div>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={6} key={post.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  style={{
                    width: '90%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar src={post.author.photo} alt={post.author.name} />
                      <div style={{ marginLeft: '10px' }}>
                        <Typography variant="subtitle1">{post.author.name}</Typography>
                        <Typography variant="caption">{post.author.accountPlan}</Typography>
                      </div>
                    </div>
                    {editingPostId === post.id ? ( 
                      <>
                        <TextField
                          label="Edit Content"
                          multiline
                          rows={4}
                          variant="outlined"
                          defaultValue={post.content}
                          fullWidth
                          onChange={(e) => setUpdatedContent(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                          <Button onClick={() => handleSavePost(post.id, updatedContent)}>Save</Button>
                          <Button onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                      </>
                    )}
                    <Typography variant="caption" style={{ color: 'gray' }}>
                      Comments {post.comments.length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {editingPostId === post.id ? (
                      <Button disabled>Edit</Button> 
                    ) : (
                      <Button onClick={() => handleEditPost(post.id)}>Edit</Button>
                    )}
                    <Button onClick={() => handleRemovePost(post.id)}>Remove</Button>
                  </CardActions>
                  <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Button>View more</Button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
          <CreatePostModal isOpen={isModalOpen} onClose={closeModal} onCreatePost={handleAddPost} />
        </div>
      )}
    </div>
  );
};

export default HomePage;