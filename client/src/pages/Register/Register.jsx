import React,{ useState} from "react";
import "./Register.css";
import request from "../../utils/request";

export default function Register() {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// const handleChange =(e)=>{
  
// };

const handleSubmit= (e)=>{
  e.preventDefault();
request.post('/auth/signup',{
  username,
  email,
  password
})
.then(res => {
  console.log(res);
  console.log(res.data);
});
console.log({username,email,password})
};


  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>User Name</label>
        <input placeholder="username" type="text" onChange={(e)=> setUserName(e.target.value)} value={username}/>
        <label>Email</label>
        <input placeholder="email" type="text" onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <label>Password</label>
        <input placeholder="password" type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
