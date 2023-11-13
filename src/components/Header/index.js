import {Component} from 'react'
import {AiOutlineProfile,AiFillFileAdd} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {MdLeaderboard} from 'react-icons/md'
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
      leaderusername:'',
      leaderlocation:'',
      leaderemail:'',
      leaderscore:0,
    }
  
    removeCookie=()=>{
     Cookies.remove("jwt_token");
     <Navigate replace to='/login'/>
    }
   
    componentDidMount(){
      this.getProfile()
      this.getLeader()
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

    getLeader=async()=>{
      const url='https://backrnd.onrender.com/leader'
      const details=await fetch(url)
      const data=await details.json()
      console.log(data)
      this.setState({leaderusername:data.username,
      leaderemail:data.email,
    leaderlocation:data.location,
  leaderscore:data.score})
    }  
    
    render(){
    const {username,email,location,score,leaderemail,leaderusername,leaderlocation,leaderscore}=this.state
    console.log(username,email,location,score)
    return (
        <nav className='header'>
          <Link to='/home'><img src='https://res.cloudinary.com/dkredoejm/image/upload/v1699748965/logo-1_ys3ya5.png' alt='logo' className='logo'/></Link>
          <div className='flex display-lg'>
            <Popup trigger={<p className='link' onClick={this.getProfile}>Profile</p>}>
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
            <Popup trigger={<p className='link' onClick={this.getLeader}>LeaderBoard</p>}>
              {close=>{
                return <div>
                  <div className='card'>
            <h1 className='profile' style={{"backgroundColor":'blue'}}>{leaderusername[0]}</h1>
            <div>
            <h2>{leaderusername}</h2>
            <p><b>Email: </b>{leaderemail}</p>
            <p><b>Location:</b>{leaderlocation}</p>
            <p><b>Score: </b>{leaderscore}</p>
            </div>
        </div>

                </div>
              }}
            </Popup>
            <Link to="/add-questions" className='link'>
              <p>Add data</p>
            </Link>
            <Link to='/users'  className='link'>
               <p>Users</p>
            </Link>
            <Link to='/' onClick={this.removeCookie}>
               <button type='button'>Logout</button>
            </Link>
          </div>
          <div className='flex display-sm'>
          <Popup trigger={<p className='link' style={{"backgroundColor":"blue"}}><AiOutlineProfile/></p>}>
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
            <Popup trigger={<p className='link' onClick={this.getLeader}><MdLeaderboard/></p>}>
              {close=>{
                return <div>
                  <div className='card'>
            <h1 className='profile' style={{"backgroundColor":'blue'}}>{leaderusername[0]}</h1>
            <div>
            <h2>{leaderusername}</h2>
            <p><b>Email: </b>{leaderemail}</p>
            <p><b>Location:</b>{leaderlocation}</p>
            <p><b>Score: </b>{leaderscore}</p>
            </div>
        </div>

                </div>
              }}
            </Popup>
            <Link to='/users'  className='link'>
               <p><FiUsers/></p>
            </Link>
            <Link to='/add-questions' className='link'>
              <p><AiFillFileAdd/></p>
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