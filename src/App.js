import './App.css';
import { useState } from 'react';
import ToDoListPage from './pages/ToDoListPage';
import { BrowserRouter as Router,Route, Routes, useNavigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [isLodding, setIsLodding] = useState(true);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const props = {isLodding,isLoggedIn, setIsLodding, setIsloggedIn}
  // const navigate = useNavigate();
  return (
    <div className="App">
      {
      // isLoggedIn ?
      //   <ToDoListPage {...props}
      //     // setIsLodding={setIsLodding}
      //     // setIsloggedIn={setIsloggedIn}
      //   /> :
        <Router>
          <Routes>
          <Route path="/" element={
            <ToDoListPage {...props}
              // setIsLodding={setIsLodding}
              // setIsloggedIn={setIsloggedIn} 
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
              // setIsLodding={setIsLodding}
              // setIsloggedIn={setIsloggedIn}
            />} />
             {/* <Redirect from="*" to="/" /> */}
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;
