import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-form-email-div'>
        <label htmlFor='email'>Email: </label>
        <div className='login-form-div'></div>
        <input
          name='email'
          className='login-form-input'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='login-form-div'>
        <label htmlFor='password'>Password: </label>
        <div className='login-form-div'></div>
        <input
          className='login-form-input'
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <div className='login-form-div'></div>
        <button id='login-form-submit-button' type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
