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


//auth
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {  LoginPageProps  } from '../types';
// import { useSessionStorage } from 'react-use';
// import {  Auth } from '../types';
// import './LoginPage.css'; 




// const LoginPage: React.FC<LoginPageProps> = ({auth,  dummyUsers }) => {
//   const navigate = useNavigate();
 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  

//   const [authUser, setAuthUser] = useSessionStorage<Auth | {}>('user', {});

//   const handleLogin = () => {
//     // Find a user with the matching email and password in the dummyUsers array
  
  
//     const user = dummyUsers.find(
//       (user) => user && user.email === email && user.password === password
//     );
  
   
//     if (user) {
//       console.log("user", user)
//       setAuthUser({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         photo: user.photo,
//         accountPlan: user.accountPlan,
//       },
//       login:  auth.login,
//       logout: auth.logout,
//     });
//   console.log('yyyyyyyyyyyyy', auth)
//       // auth.login(user); 
//       navigate('/home');
//     } else {
//       setErrorMessage('Invalid email or password. Try again');
//     }
//   };

//   console.log("authUser" , authUser);

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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  LoginPageProps  } from '../types';
// import { useSessionStorage } from 'react-use';
// import {  Auth } from '../types';
import './LoginPage.css'; 


const LoginPage: React.FC<LoginPageProps> = ({auth,  dummyUsers }) => {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  // const [authUser, setAuthUser] = useSessionStorage<Auth | {}>('user', {});

  const handleLogin = () => {
    // Find a user with the matching email and password in the dummyUsers array
  
  
    const user = dummyUsers.find(
      (user) => user && user.email === email && user.password === password
    );
  
   
    if (user) {
      auth.login(user); 
      navigate('/home');
    } else {
      setErrorMessage('Invalid email or password. Try again');
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
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          {errorMessage && (
            <p className="error-message" style={{ color: 'red' }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


