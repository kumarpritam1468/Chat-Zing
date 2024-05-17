import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <Router>

      <div className=" p-4 flex justify-center items-center h-screen w-screen">
        <Toaster/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
