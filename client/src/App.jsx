import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <Router>

      <div className=" p-4 flex justify-center items-center h-screen w-screen">
        <Toaster/>
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>} />
          <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login/>} />
          <Route path='/signup' element={authUser ? <Navigate to='/'/> : <SignUp/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
