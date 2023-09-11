import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, CardContent, CardActions, Avatar, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreatePostModal from '../../components/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { HomePageProps, Post } from '../../types';
import { addPost, removePost, editPost} from '../../redux/postsSlice';
import {
  Header,
  AddPostWrapper,
  PostCard,
  AvatarWrapper,
  EditButtonsWrapper,
} from '../../styles';
import { AuthState } from '../../redux/authSlice';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetState as resetAuthState } from '../../redux/authSlice';
import { resetState as resetPostsState } from '../../redux/postsSlice';

const HomePage: React.FC<HomePageProps<Post>> = ({dummyPosts}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean; user: { name: string } | null } }) => state.auth.isAuthenticated);
  const posts = useSelector((state: { posts: Post[] }) => state.posts);
  console.log('postss', posts)

  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const userName = auth.user?.name;
  const userEmail= auth.user?.email;
  const userAccountPlan = auth.user?.accountPlan;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [updatedContent, setUpdatedContent] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditPost = (postId: number) => {
    setEditingPostId(postId);
  };

  const handleSavePost = (postId: number, updatedContent: string) => {
    dispatch(editPost({ postId, updatedContent }));
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const handleRemovePost = (postId: number) => {
    dispatch(removePost(postId));
  };

  const handleAddPost = (newPost: { title: string; content: string }) => {
    dispatch(addPost(newPost));
  };

 
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState());
    dispatch(resetPostsState(dummyPosts)); 
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
     <>
     { isAuthenticated && (
      <>
      <Typography variant="h6">Welcome, {userName}</Typography>
      <Typography variant="subtitle1">Email: {userEmail}</Typography>
      <Typography variant="subtitle1">Account Type: {userAccountPlan}</Typography>
     <Header>
     <Button variant="outlined" onClick={handleLogout} sx={{marginTop:'50px', alignSelf: 'center', display: 'flex'}}>
     <LogoutIcon/>Logout
       </Button>
     </Header>
     <AddPostWrapper>
         <Typography variant="h6" sx={{ marginTop: '50px' }}>Add post</Typography>
         <Button variant="contained" onClick={openModal} style={{ marginLeft: '10px', marginTop: '50px'}}>
           <AddIcon/>
         </Button>
       </AddPostWrapper>
     <Grid container spacing={2}>
       {posts.map((post) => (
         <Grid item xs={12} sm={6} md={6} key={post.id} style={{ display: 'flex', justifyContent: 'center' }}>
           <PostCard>
             <CardContent>
               <AvatarWrapper>
                 <Avatar src={post.author.photo} alt={post.author.name} />
                    <div style={{ marginLeft: '10px' }}>
                      <Typography variant="subtitle1">{post.author.name}</Typography>
                      <Typography variant="caption">{post.author.accountPlan}</Typography>
                    </div>
               </AvatarWrapper>
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
                     style={{
                      marginTop: "12px",
                     }}
                   />
                   <EditButtonsWrapper>
                     <Button onClick={() => handleSavePost(post.id, updatedContent)} sx={{fontSize: '12px'}}>Save</Button>
                     <Button onClick={handleCancelEdit} sx={{fontSize: '12px'}}>Cancel</Button>
                   </EditButtonsWrapper>
                 </>
               ) : (
                 <>
                   <h3>{post.title}</h3>
                   <p>{post.content}</p>
                 </>
               )}
               <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Typography component="div">
                        <Button style={{ textDecoration: 'underline', fontSize: '11px', color: 'gray' }}>View  {post.comments.length} comments</Button>
                    </Typography>
               </Link>
             </CardContent>
             <CardActions>
               {editingPostId === post.id ? (
                 <Button disabled><EditIcon/></Button>
               ) : (
                 <Button onClick={() => handleEditPost(post.id)}><EditIcon/></Button>
               )}
               <Button onClick={() => handleRemovePost(post.id)}><DeleteIcon sx={{color: 'red'}}/></Button>
             </CardActions>
           </PostCard>
         </Grid>
       ))}
     </Grid>
     <CreatePostModal isOpen={isModalOpen} onClose={closeModal} onCreatePost={handleAddPost} />
    
     </>
     )}
     </>
  );
};

export default HomePage;
