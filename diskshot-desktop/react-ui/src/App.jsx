import { Route, Routes,  } from 'react-router-dom'
import './App.css'
import Button from './components/Button'
import InputField from './components/Input'
import Login from './pages/Login';
import Signup from './pages/SiginUp';

function App() {
 
// const {pathname} = useLocation();
  return (
    <>
  
     <Routes >
      
      <Route path='/'  element={<Login />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/signup'  element={<Signup />} />
     </Routes>
    </>
  )
}

export default App
