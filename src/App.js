import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import ExerciseEnglish from './components/ExerciseEnglish'
import UserDetails from './components/UserDetails'
import ExerciseTelugu from './components/ExerciseTelugu'
import AddQuestions from './components/AddQuestions'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path='/exercise/english' element={<ExerciseEnglish/>}/>
      <Route exact path='exercise/telugu' element={<ExerciseTelugu/>}/>
      <Route exact path='/users' element={<UserDetails/>}/>
      <Route exact path='/add-questions' element={<AddQuestions/>}/>
      <Route element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;