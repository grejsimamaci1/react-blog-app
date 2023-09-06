import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, login} from '../../redux/authSlice'
import './LoginPage.css'; 

interface LoginPageProps{
  dummyUsers: User[];
}

const LoginPage: React.FC<LoginPageProps> =({  dummyUsers }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const dummyToken = 'dummy-access-token';

      localStorage.setItem('accessToken', dummyToken);

      dispatch(login({user, token: dummyToken}));
      setError('');
      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
    <div className="login-container">
      <h3>Login Page</h3>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn' onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default LoginPage;





