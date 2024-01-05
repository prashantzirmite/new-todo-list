import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage'
import ToDoListPage from '../pages/ToDoListPage';

function AppLoadComponent() {
    const [isLodding, setIsLodding] = useState(true);
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const navigate = useNavigate();
    const props = {isLodding,isLoggedIn, setIsLodding, setIsloggedIn, navigate}  
  return (
    <Routes>
    <Route path="/" element={
      <ToDoListPage {...props}
        />
    } />
    <Route path="/signin" element={
      <SignInPage {...props}
        // setIsLodding={setIsLodding}
        // setIsloggedIn={setIsloggedIn} 
        />
    } />
    <Route path="/signup" element={
      <SignUpPage {...props}
      />} />
       {/* <Redirect from="*" to="/" /> */}
    </Routes>
  )
}

export default AppLoadComponent