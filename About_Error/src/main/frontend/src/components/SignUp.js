import React, { useState } from 'react'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const signUpHandler = async (event) => {
    event.preventDefault();
    try{
    const response = await fetch('http://localhost:8080/signup',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({email, password, name, phone}),
    });
    if(response.status == 200){
      alert("Success!");
    }
  }catch (error){
    console.log(error);
  }
};


  return (
    <form onSubmit={signUpHandler}>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="repassword" name="repassword" value={repassword} onChange={(e) => setRePassword(e.target.value)} />
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">SignUp</button>
    </form>
  );
}

export default SignUp;