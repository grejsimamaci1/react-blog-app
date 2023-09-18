import React, { useState } from 'react';
import { TextField, Button, Container, InputAdornment, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, login  } from '../../redux/authSlice';
import './LoginPage.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginPageProps {
  dummyUsers: User[];
}

type LoginFormValues = {
  email: string;
  password: string;
}
const LoginPage: React.FC<LoginPageProps> = ({ dummyUsers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormValues>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password } = data;
    const user = dummyUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      const dummyToken = 'dummy-access-token';
      localStorage.setItem('accessToken', dummyToken);
      dispatch(login({ user, token: dummyToken }));
      navigate('/home');
      setLoginError(null);
    } else {
      setLoginError('Invalid email or password')
    }
  };

  return (
    <Container maxWidth="sm" className="login-container" style={{ width: '500px' }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={7}
          >
            <form onSubmit={handleSubmit(handleLogin)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email", { 
                  required: "Email is required" 
                })}
                error={!!errors.email || !!loginError}
                helperText={errors.email?.message || loginError}
                InputProps={{
                  style: {
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    border: 'none',
                    height: '50px',
                    width: '300px',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ width: '18px' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", { 
                  required: "Password is required"
                })}
                InputProps={{
                  style: {
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    border: 'none',
                    height: '50px',
                    width: '300px',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ width: '18px' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type='submit'
                variant="contained"
                className="btn"
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
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default LoginPage;


