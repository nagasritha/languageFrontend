import {Component} from 'react'
import {AiOutlineProfile} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {PiArticleMediumFill} from 'react-icons/pi'
import {FcAbout} from 'react-icons/fc'
import {BiLogIn} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import {Link,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import "./index.css"

class Header extends Component{
    state={
      username:'',
      email:'',
      location:'',
      score:0,
    }
  
    removeCookie=()=>{
     Cookies.remove("jwt_token");
     <Navigate replace to='/login'/>
    }
   
    componentDidMount(){
      this.getProfile()
    }

    getProfile=async ()=>{
      const token=Cookies.get("jwt_token")
      const url='https://backrnd.onrender.com/profile'
      const options={
        method:'GET',
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      const obtainedData=await fetch(url,options)
      const jsonData=await obtainedData.json()
      console.log(jsonData)
      this.setState({username:jsonData.username,
        email:jsonData.email,
        location:jsonData.location,
        score:jsonData.score})
      }
    
    render(){
    const {username,email,location,score}=this.state
console.log(username,email,location,score)
    return (
        <nav className='header'>
          <Link to='/home'><img src='https://res.cloudinary.com/dkredoejm/image/upload/v1699748965/logo-1_ys3ya5.png' alt='logo' className='logo'/></Link>
          <div className='flex display-lg'>
            <Popup trigger={<p className='link'>Profile</p>}>
              {close=>{
                return <div>
                  <div className='card'>
            <h1 className='profile' style={{"backgroundColor":'blue'}}>{username[0]}</h1>
            <div>
            <h2>{username}</h2>
            <p><b>Email: </b>{email}</p>
            <p><b>Location:</b>{location}</p>
            <p><b>Score: </b>{score}</p>
            </div>
        </div>

                </div>
              }}
            </Popup>
            <Link to='/article' className='link'>
              <p>Articles</p>
            </Link>
            <Link to='/about'  className='link'>
               <p>About Us</p>
            </Link>
            <Link to='/users'  className='link'>
               <p>Users</p>
            </Link>
            <Link to='/' onClick={this.removeCookie}>
               <button type='button'>Logout</button>
            </Link>
          </div>
          <div className='flex display-sm'>
          <Popup trigger={<p className='link'><AiOutlineProfile/></p>}>
              {close=>{
                return <div>
                  <div className='card'>
            <h1 className='profile' style={{"backgroundColor":'blue'}}>{username[0]}</h1>
            <div>
            <h2>{username}</h2>
            <p><b>Email: </b>{email}</p>
            <p><b>Location:</b>{location}</p>
            <p><b>Score: </b>{score}</p>
            </div>
        </div>

                </div>
              }}
            </Popup>
            <Link to='/article' className='link'>
              <p><PiArticleMediumFill/></p>
            </Link>
            <Link to='/about'  className='link'>
               <p><FcAbout/></p>
            </Link>
            <Link to='/users'  className='link'>
               <p><FiUsers/></p>
            </Link>
            <Link to='/' onClick={this.removeCookie}>
               <p><BiLogIn/></p>
            </Link>
          </div>
        </nav>
    )
}
}
export default Header