import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword=()=>{
    alert("Чтобы восстановить пароль свяжитесь с администратором admin@mail.ru");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label><br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label><br />
      <button onClick={handleForgotPassword}>Забыли пароль</button>
      <button type="submit">ВОЙТИ</button>

    </form>
  );
};

export default RegistrationForm;