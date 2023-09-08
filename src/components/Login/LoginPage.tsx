// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { User, login} from '../../redux/authSlice'
// import './LoginPage.css'; 
// import EmailIcon from '@mui/icons-material/Email';

// interface LoginPageProps{
//   dummyUsers: User[];
// }

// const LoginPage: React.FC<LoginPageProps> =({  dummyUsers }) => {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = () => {
    
//     const user = dummyUsers.find(u => u.email === email && u.password === password);
    
//     if (user) {
//       const dummyToken = 'dummy-access-token';

//       localStorage.setItem('accessToken', dummyToken);

//       dispatch(login({user, token: dummyToken}));
//       setError('');
//       navigate('/home');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div>
//     <div className="login-container">
//       <div className="login-form">
        
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className='btn' onClick={handleLogin}>Login</button>
//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { TextField, Button, Container, InputAdornment, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, login } from '../../redux/authSlice';
import './LoginPage.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

interface LoginPageProps {
  dummyUsers: User[];
}

const LoginPage: React.FC<LoginPageProps> = ({ dummyUsers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = dummyUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      // console.log('loginpage  user', user)

      const dummyToken = 'dummy-access-token';
      localStorage.setItem('accessToken', dummyToken);
      dispatch(login({ user, token: dummyToken }));
      setError('');
      navigate('/home');

    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={3} 
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                  border: 'none',
                  height: '50px',
                  width: '300px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{width: '18px'}}/>
                  </InputAdornment>
                ),
              }}
              
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                  border: 'none',
                  height: '50px',
                  width: '300px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{width: '18px'}}/>
                  </InputAdornment>
                ),
              }}
            
            />
            <Button
              variant="contained"
              className="btn"
              onClick={handleLogin}
              style={{
                marginTop: '40px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                border: 'none',
                width: '200px',
                padding: '7px 7px',
                borderRadius: '8px',
              }}
               
            >
              Login
            </Button>
            {error && <p className="error">{error}</p>}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;

//styled components
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { User, login } from '../../redux/authSlice';
// import { InputAdornment } from '@mui/material';
// import { StyledContainer, StyledCard, StyledTextField, StyledButton } from '../styles';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';

// interface LoginPageProps {
//   dummyUsers: User[];
// }

// const LoginPage: React.FC<LoginPageProps> = ({ dummyUsers }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = () => {
//     const user = dummyUsers.find((u) => u.email === email && u.password === password);

//     if (user) {
//       const dummyToken = 'dummy-access-token';

//       localStorage.setItem('accessToken', dummyToken);

//       dispatch(login({ user, token: dummyToken }));
//       setError('');
//       navigate('/home');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <StyledContainer maxWidth="sm" className="login-container">
//       <StyledCard>
//         <StyledTextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmailIcon sx={{ width: '18px' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <StyledTextField
//           type="password"
//           label="Password"
//           variant="outlined"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           margin="normal"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon sx={{ width: '18px' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <StyledButton
//           variant="contained"
//           className="btn"
//           onClick={handleLogin}
//         >
//           Login
//         </StyledButton>
//         {error && <p className="error">{error}</p>}
//       </StyledCard>
//     </StyledContainer>
//   );
// };

// export default LoginPage;




