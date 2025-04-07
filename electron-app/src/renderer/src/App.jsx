import Versions from './components/Versions'
import { Route, Routes,  } from 'react-router-dom'
import './index.css'
import Button from './components/Button'
import InputField from './components/Input'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

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
