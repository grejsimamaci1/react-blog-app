// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginPage.css'; 

// const LoginPage  = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     navigate('/home');
//   };

//   return (
//     <div>
//     <div className="login-container">
//       <h3>Login Page</h3>
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
//       </div>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;


//redux
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../redux/authSlice'
import { User } from '../../redux/authSlice'
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

    console.log('userrrr', user)

    if (user) {
      
      dispatch(login(user));
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

//auth
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {  LoginPageProps  } from '../types';
// import './LoginPage.css'; 


// const LoginPage: React.FC<LoginPageProps> = ({auth,  dummyUsers }) => {
//   const navigate = useNavigate();
 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  


//   const handleLogin = () => {
   
//     const user = dummyUsers.find(
//       (user) => user && user.email === email && user.password === password
//     );
  
//     if (user) {
//       auth.login(user); 
//       navigate('/home');
//     } else {
//       setErrorMessage('Invalid email or password. Try again');
//     }
//   };


//   return (
//     <div>
//       <div className="login-container">
//         <h3>Login Page</h3>
//         <div className="login-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="btn" onClick={handleLogin}>
//             Login
//           </button>
//           {errorMessage && (
//             <p className="error-message" style={{ color: 'red' }}>
//               {errorMessage}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


