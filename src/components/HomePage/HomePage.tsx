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


//auth
import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CreatePostModal from '../CreatePostModal';
import { HomePageProps, Post, Auth } from '../types';
import { useSessionStorage } from 'react-use';


const HomePage: React.FC<HomePageProps<Post> & { auth: Auth }> = ({ auth, dummyPosts, setDummyPosts }) => {
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const [authStorage, setAuthStorage] = useSessionStorage<Auth | null>('user', null);


  useEffect(() => {
    setAuthStorage(auth);  
  }, [auth]);

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditPost = (postId: number, updatedPost: Partial<Post>) => {
    setDummyPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
    );
  };

  const handleRemovePost = (postId: number) => {
    setDummyPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleAddPost = (newPost: { title: string; content: string;  }) => {
    setDummyPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: {
          id: 103,
          name:  authStorage?.user?.name as string,
          photo: 'https://example.com/new-author-profile.jpg',
          accountPlan: authStorage?.user?.accountPlan as string,
        },
        comments: [],
      },
    ]);
  };


  const handleLogout = () => {
    authStorage?.logout();
    navigate('/')
  };

  if (!authStorage?.user) {
    
    navigate('/');
    return null; 
  }
  
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* <Typography variant="h6">Welcome, {auth.name}</Typography> */}
        <Typography variant="h6">Welcome, {authStorage?.user?.name}</Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h6">Click here to add a new post:</Typography>
        <Button variant="contained" onClick={openModal} style={{ marginLeft: '10px' }}>
          Add
        </Button>
      </div>
      <Grid container spacing={2}>
        {dummyPosts.map((post) => (
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
                <h3>{post.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>
                    <Button onClick={() => handleEditPost(post.id, { title: 'Updated Title' })}>Edit</Button>
                    <Button onClick={() => handleRemovePost(post.id)}>Remove</Button>
                  </div>
                </div>
                <p>{post.content}</p>
                <Typography variant="caption" style={{ color: 'gray' }}>
                  Comments {post.comments.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                  <Button>View more</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} onCreatePost={handleAddPost} />
    </div>
  );
};

export default HomePage;





