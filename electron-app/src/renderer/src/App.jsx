import Versions from './components/Versions'
import { Route, Routes,useLocation} from 'react-router-dom'
import './index.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import UploadPhoto from './pages/UploadPhoto';
import Chat from './pages/Chats';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const {pathname} = useLocation();
  return (
    <>
   {pathname !== "/login" && pathname !== "/signup"  && <NavBar /> }
    <Routes >

     <Route path='/'  element={<Login />} />
     <Route path='/home'  element={<Home />} />
     <Route path='/uploadphoto'  element={<UploadPhoto />} />
     <Route path='/chats'  element={<Chat />} />


     <Route path='/login'  element={<Login />} />
     <Route path='/signup'  element={<Signup />} />
    </Routes>
   </>
  )
}

export default App
