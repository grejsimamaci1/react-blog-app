import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, TextField, CardActions } from '@mui/material';
import { PostDetailsProps, Post, Comment } from '../../types';
import { useDispatch, useSelector } from 'react-redux'; 
import { logout } from '../../redux/authSlice';
import { addComment, removeComment, editComment } from '../../redux/postsSlice';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { Header } from '../../styles';
import { resetState as resetAuthState } from '../../redux/authSlice';
import { resetState as resetPostsState } from '../../redux/postsSlice';

const PostDetails: React.FC<PostDetailsProps<Post>> = ({dummyPosts}) => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector((state: { posts: Post[]}) => state.posts);

  const selectedPost = posts.find((post) => post.id.toString() === postId);
 

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
    dispatch(resetAuthState());
    dispatch(resetPostsState(dummyPosts)); 
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
          <Header>
              <Button variant="outlined" onClick={handleLogout} sx={{marginBottom:'50px', alignSelf: 'center', display: 'flex'}}>
                <LogoutIcon/>Logout
          </Button>
          </Header>
          <Typography variant="h5"  sx={{paddingBottom: '10px', fontSize:'20px'}}>{selectedPost.title}</Typography>
          <Card>
            <CardContent>
              <Typography>{selectedPost.content}</Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" sx={{paddingTop: '20px', fontSize:'15px'}}>Comments</Typography>
          {selectedPost.comments.map((comment: Comment) => (
            <Card key={comment.id} sx={{
              display:"flex",
              flexDirection:"column",
              gap:3

            }}>
              <CardContent>
                {editingCommentId === comment.id ? (

                 
                  // <TextField
                  //   label="Edit Comment"
                  //   multiline
                  //   variant="outlined"
                  //   fullWidth
                  //   value={editedCommentText}
                  //   onChange={(e) => setEditedCommentText(e.target.value)}
                  //   style={{
                  //     height:'20px',
                  //     marginBottom: '13px'
                  //   }}
                  // />
                  <TextField
                  label="Edit Comment"
                  multiline={!editedCommentText.includes('\n')}
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                  style={{
                    height: 'auto', 
                    marginBottom: '13px',
                  }}
                />
                ) : (
                  <Typography>{comment.text}</Typography>
                )}
              </CardContent>
              <CardActions>
                {editingCommentId === comment.id ? (
                  <>
                    <Button onClick={handleSaveComment} sx={{fontSize: '12px', marginTop: '3px'}}>Save</Button>
                    <Button onClick={handleCancelEdit} sx={{fontSize: '12px', marginTop: '3px'}}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditComment(comment.id, comment.text)}><EditIcon/></Button>
                    <Button onClick={() => handleRemoveComment(comment.id)}><DeleteIcon sx={{color: 'red'}}/></Button>
                  </>
                )}
              </CardActions>
            </Card>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection:'row' }}>
            <TextField
              label="Add a new comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" style={{ marginTop: '10px', marginLeft: '5px', height: '100%' }} onClick={handleAddNewComment}>
             <AddIcon />
            </Button>
          </div>
         
        </div>
      )}
    </>
  );
};

export default PostDetails;




