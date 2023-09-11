import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (newPost: { title: string; content: string }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onCreatePost }) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(()=>{
    if (!isOpen) {
      setNewPostContent('');
      setNewPostTitle('');
    }
  }, [isOpen]);

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent) {
      onCreatePost({ title: newPostTitle, content: newPostContent });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create a New Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreatePost} color="primary">
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
