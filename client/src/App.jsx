import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <Router>

      <div className=" p-4 flex justify-center items-center h-screen w-screen">
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
