import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PostDetails from './pages/PostDetails/PostDetails';
import { Provider } from 'react-redux'; 
import { User} from './redux/authSlice';
import authReducer from './redux/authSlice';
import postsReducer from './redux/postsSlice';
import { Post} from './types';
import { createStore,combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 


const App: React.FC = () => {

  const [dummyPosts, setDummyPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      author: {
        id: 101,
        name: 'John Doe',
        photo: 'https://example.com/john-doe-profile.jpg',
        accountPlan: 'Premium',
      },
      comments: [
        { id: 1, text: 'Great post!', author: 'Alice' },
        { id: 2, text: 'I agree!', author: 'Bob' },
      ],
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      author: {
        id: 102,
        name: 'Jane Smith',
        photo: 'https://example.com/jane-smith-profile.jpg',
        accountPlan: 'Basic',
      },
      comments: [
        { id: 3, text: 'Interesting.', author: 'Charlie' },
        { id: 4, text: 'Thanks for sharing!', author: 'David' },
      ],
    }
  ]);

  const dummyUsers: User[]  = [
    {
      id: 101,
      name: 'John Doe',
      email: '1',
      password: '1',
      photo: 'https://example.com/john-doe-profile.jpg',
      accountPlan: 'Premium',
    },
    {
      id: 102,
      name: 'Sara Sara',
      email: 'sara@example.com',
      password: 'password',
      photo: 'https://example.com/john-doe-profile.jpg',
      accountPlan: 'Premium',
    },
    {
      id: 103,
      name: 'Tom tom',
      email: 'tom@example.com',
      password: 'password',
      photo: 'https://example.com/john-doe-profile.jpg',
      accountPlan: 'Premium',
    }
   
  ];

  const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
  });
  
  const store = createStore(rootReducer, { posts: dummyPosts}, applyMiddleware(thunk));
  


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage  dummyUsers={dummyUsers} />} />
          <Route path="/home" element={<HomePage dummyPosts={dummyPosts} setDummyPosts={setDummyPosts} />} />
          <Route path="/post/:postId" element={<PostDetails dummyPosts={dummyPosts} setDummyPosts={setDummyPosts} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;