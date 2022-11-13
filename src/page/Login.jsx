import React from 'react';
import axios from 'axios';
import '../scss/component/Login/Login.scss';
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        let item = { userName, password }
        await axios.post('https://localhost:7292/api/Account/Login', item).then(res => localStorage.setItem('accessToken',res.data.accessToken)).catch(err => console(err))
        navigate('/')
    }
    return (
        <div>
            <div class="login-box">
  <h2>Login</h2>
 
    <div class="user-box">
    <input type='text'  onChange={(e) => setUserName(e.target.value)} required />
      <label>Username</label>
    </div>
    <div class="user-box">
    <input type='password' onChange={(e) => setPassword(e.target.value)} required />
      <label>Password</label>
    </div>
    <button onClick={() => handleLogin()}>Login</button>

  
</div>
        </div>
    );
}

