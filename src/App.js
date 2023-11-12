import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import ExerciseEnglish from './components/ExerciseEnglish'
import UserDetails from './components/UserDetails'
import ExerciseTelugu from './components/ExerciseTelugu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/exercise/english' element={<ExerciseEnglish/>}/>
      <Route path='exercise/telugu' element={<ExerciseTelugu/>}/>
      <Route path='/users' element={<UserDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;