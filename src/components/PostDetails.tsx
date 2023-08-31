// import  { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Typography, Button, Card, CardContent, TextField, CardActions } from '@mui/material';
// import { PostDetailsProps, Post } from './types';

// const PostDetails: React.FC<PostDetailsProps<Post>> = ({ dummyPosts, setDummyPosts }) => {

//   const { postId } = useParams();
//   const selectedPost = dummyPosts.find(post => post.id.toString() === postId);

//   const [newComment, setNewComment] = useState('');

//   if (!selectedPost) {
//     return <div>Post not found</div>;
//   }

//   const handleAddNewComment = () => {
//     if (newComment) {
//       const updatedPost = {
//         ...selectedPost!,
//         comments: [
//           ...selectedPost!.comments,
//           { id: selectedPost!.comments.length + 1, text: newComment, author: 'Current User' },
//         ],
//       };

//       const updatedPosts = dummyPosts.map(post => (post.id === selectedPost!.id ? updatedPost : post));
//       setDummyPosts(updatedPosts);
//       setNewComment('');
//     }
//   };

//   const handleEditComment = (commentId: number, newText: string) => {
//     const updatedPost = {
//       ...selectedPost!,
//       comments: selectedPost!.comments.map(comment =>
//         comment.id === commentId ? { ...comment, text: newText } : comment
//       ),
//     };

//     const updatedPosts = dummyPosts.map(post => (post.id === selectedPost!.id ? updatedPost : post));
//     setDummyPosts(updatedPosts);
//   };

//   const handleRemoveComment = (commentId: number) => {
//     const updatedPost = {
//       ...selectedPost!,
//       comments: selectedPost!.comments.filter(comment => comment.id !== commentId),
//     };

//     const updatedPosts = dummyPosts.map(post => (post.id === selectedPost!.id ? updatedPost : post));
//     setDummyPosts(updatedPosts);
//   };

//   return (
//     <div>
//       <Typography variant="h5">{selectedPost.title}</Typography>
//       <Card>
//         <CardContent>
//           <Typography>{selectedPost.content}</Typography>
//         </CardContent>
//       </Card>
//       <Typography variant="h6">Comments</Typography>
//       {selectedPost.comments.map(comment => (
//         <Card key={comment.id}>
//           <CardContent>
//             <Typography>{comment.text}</Typography>
//           </CardContent>
//           <CardActions>
//             <Button onClick={() => handleEditComment(comment.id, 'Updated Comment')}>
//               Edit
//             </Button>
//             <Button onClick={() => handleRemoveComment(comment.id)}>Remove</Button>
//           </CardActions>
//         </Card>
//       ))}
//       <div style={{ marginTop: '20px' }}>
//         <TextField
//           label="Add a new comment"
//           variant="outlined"
//           fullWidth
//           value={newComment}
//           onChange={e => setNewComment(e.target.value)}
//         />
//         <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleAddNewComment}>
//           Add Comment
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CardActions,
} from '@mui/material';
import { PostDetailsProps, Post, Auth } from './types';
import { useSessionStorage } from 'react-use';

const PostDetails: React.FC<PostDetailsProps<Post> & { auth: Auth }> = ({
  auth,
  dummyPosts,
  setDummyPosts,
}) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [newComment, setNewComment] = useState('');
  const [editingComments, setEditingComments] = useState<{ [commentId: number]: boolean }>({});

  const selectedPost = dummyPosts.find(post => post.id.toString() === postId);


  const [authStorage, setAuthStorage] = useSessionStorage<Auth | null>('user', null);

  if (!selectedPost) {
    return <div>Post not found</div>;
  }

 
 

  useEffect(() => {
    setAuthStorage(auth);
  }, [auth]);

  const handleEditComment = (commentId: number) => {
    // Stores the original post data before editing
    const originalPost = selectedPost;

    setEditingComments({
      ...editingComments,
      [commentId]: true,
      [`original_${commentId}`]: originalPost,
    });
  };


  const handleCommentEditChange = (commentId: number, newText: string) => {
    // Updates comment text in editingComments state
    setEditingComments({
      ...editingComments,
      [commentId]: true,
    });

    // Updates the edited text in the comment itself
    const updatedComments = selectedPost.comments.map(comment =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );

    const updatedPost = {
      ...selectedPost,
      comments: updatedComments,
    };

    const updatedPosts = dummyPosts.map(post => (post.id === selectedPost.id ? updatedPost : post));
    setDummyPosts(updatedPosts);
  };


  const handleSaveCommentEdit = (commentId: number) => {
    const editedText = selectedPost.comments.find(comment => comment.id === commentId)?.text;

    if (editedText !== undefined) {
      const updatedComments = selectedPost.comments.map(comment =>
        comment.id === commentId ? { ...comment, text: editedText } : comment
      );

      const updatedPost = {
        ...selectedPost,
        comments: updatedComments,
      };

      const updatedPosts = dummyPosts.map(post => (post.id === selectedPost.id ? updatedPost : post));
      setDummyPosts(updatedPosts);

      setEditingComments({
        ...editingComments,
        [commentId]: false,
      });
    }
  };

  const handleCancelCommentEdit = (commentId: number) => {
    // Gets the original text of the comment from the stored original post
    const originalPost = editingComments[`original_${commentId}`] as Post;
    console.log('originalposttt', originalPost)
    const originalText = originalPost.comments.find(comment => comment.id === commentId)?.text;

    // Updates the comment text in the editingComments state and reset to the original text
    setEditingComments({
      ...editingComments,
      [commentId]: false,
    });

    // Updates the comment text in the selectedPost's comments array to the original text
    const updatedComments = selectedPost.comments.map(comment =>
      comment.id === commentId ? { ...comment, text: originalText || '' } : comment
    );

    const updatedPost = {
      ...selectedPost,
      comments: updatedComments,
    };

    const updatedPosts = dummyPosts.map(post => (post.id === selectedPost.id ? updatedPost : post));
    setDummyPosts(updatedPosts);
  };


  const handleRemoveComment = (commentId: number) => {
    const updatedPost = {
      ...selectedPost,
      comments: selectedPost.comments.filter(comment => comment.id !== commentId),
    };

    const updatedPosts = dummyPosts.map(post => (post.id === selectedPost.id ? updatedPost : post));
    setDummyPosts(updatedPosts);
  };

  const handleAddNewComment = () => {
    if (newComment) {
      const updatedPost = {
        ...selectedPost,
        comments: [
          ...selectedPost.comments,
          { id: selectedPost.comments.length + 1, text: newComment, author: 'Current User' },
        ],
      };

      const updatedPosts = dummyPosts.map(post => (post.id === selectedPost.id ? updatedPost : post));
      setDummyPosts(updatedPosts);
      setNewComment('');
    }
  };

  const handleLogout = () => {
    authStorage?.logout();
    navigate('/');
  };

  if (!authStorage?.user) {
    navigate('/');
    return null; 
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h6">Welcome, {authStorage?.user?.name}</Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Typography variant="h5">{selectedPost.title}</Typography>
      <Card>
        <CardContent>
          <Typography>{selectedPost.content}</Typography>
        </CardContent>
      </Card>
      <Typography variant="h6">Comments</Typography>
      {selectedPost.comments.map(comment => (
        <Card key={comment.id}>
          <CardContent>
            {editingComments[comment.id] ? (
              <TextField
                value={comment.text}
                onChange={e => handleCommentEditChange(comment.id, e.target.value)}
                fullWidth
              />
            ) : (
              <Typography>{comment.text}</Typography>
            )}
          </CardContent>
          <CardActions>
            {editingComments[comment.id] ? (
              <>
                <Button onClick={() => handleSaveCommentEdit(comment.id)}>Save</Button>
                <Button onClick={() => handleCancelCommentEdit(comment.id)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleEditComment(comment.id)}>Edit</Button>
                <Button onClick={() => handleRemoveComment(comment.id)}>Remove</Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}
      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Add a new comment"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleAddNewComment}>
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default PostDetails;