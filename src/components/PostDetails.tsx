import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, TextField, CardActions } from '@mui/material';
import { PostDetailsProps, Post, Comment } from './types';
import { useDispatch, useSelector } from 'react-redux'; 
import { logout } from '../redux/authSlice';
import { addComment, removeComment, editComment } from '../redux/postsSlice';

const PostDetails: React.FC<PostDetailsProps<Post>> = () => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector((state: { posts: Post[]}) => state.posts);

  const selectedPost = posts.find((post) => post.id.toString() === postId);
  console.log('selected post', selectedPost )

  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean, user: { name: string } | null } }) => state.auth.isAuthenticated
  );

  const handleAddNewComment = () => {
    if (newComment && selectedPost) { 
      dispatch(addComment({ postId: selectedPost.id, text: newComment }));
      setNewComment('');
    }
  };

  const handleEditComment = (commentId: number, commentText: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const handleSaveComment = () => {
    if (editedCommentText && editingCommentId !== null && selectedPost) { 
      dispatch(editComment({ postId: selectedPost.id, commentId: editingCommentId, text: editedCommentText }));
      setEditingCommentId(null);
      setEditedCommentText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleRemoveComment = (commentId: number) => {
    if (selectedPost) { 
      dispatch(removeComment({ postId: selectedPost.id, commentId }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  
  useEffect(()=>{
    if (!isAuthenticated) {
      navigate('/');
    }

  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated && selectedPost && ( 
        <div>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
          <Typography variant="h5">{selectedPost.title}</Typography>
          <Card>
            <CardContent>
              <Typography>{selectedPost.content}</Typography>
            </CardContent>
          </Card>
          <Typography variant="h6">Comments</Typography>
          {selectedPost.comments.map((comment: Comment) => (
            <Card key={comment.id}>
              <CardContent>
                {editingCommentId === comment.id ? (
                  <TextField
                    label="Edit Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                ) : (
                  <Typography>{comment.text}</Typography>
                )}
              </CardContent>
              <CardActions>
                {editingCommentId === comment.id ? (
                  <>
                    <Button onClick={handleSaveComment}>Save</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditComment(comment.id, comment.text)}>Edit</Button>
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
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleAddNewComment}>
              Add Comment
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;