import './App.css';
import Navbar from './components/navbar/Navbar.js';
import SearchUser from './components/search_users/SearchUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './components/posts/Posts';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from './components/login/Login'
import CreatePost from './components/createpost/CreatePost'
import SignUp from './components/signup/Signup'
import MyProfile from './components/myprofile/MyProfile';
import ProfilePage from './components/profilepage/ProfilePage';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/home" element={<Posts/>}/>
      <Route path="/" element={<Posts/>}/>
      <Route path="/search" element={<SearchUser/>}/>
      <Route path="/myprofile" element={<MyProfile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
      <Route path="/user" element={<ProfilePage/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
