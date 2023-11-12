import {Component} from 'react'
import {Link,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Register extends Component{
  state={
    email:'',
    username:'',
    gender:'Male',
    password:'',
    location:'',
    message:'',
  }

  updateName=(event)=>{
    this.setState({email:event.target.value})
  }

  updateUserName=(event)=>{
    this.setState({username:event.target.value})
  }

  updateLocation=(event)=>{
    this.setState({location:event.target.value})
  }

  updatePassword=(event)=>{
    this.setState({password:event.target.value})
  }

  updateGender=(event)=>{
    this.setState({gender:event.target.value})
  }

  submitForm=async (event)=>{
   event.preventDefault()
   const {username,location,gender,password,email}=this.state
   if(username!=="" && location!=='' && gender!=='' && password!=='' && email!==''){
   const userDetails={
    "username":username,
    "location":location,
    "gender":gender,
    "password":password,
    "email":email
   }
   const url='https://backrnd.onrender.com/register'
   const options={
    method:`POST`,
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify(userDetails)
   }
   const putData=await fetch(url,options)
   const response=await putData.json()
   console.log(response)
    this.setState({message:response.message})

    }  
  }

  render() {
     const {email,username,loction,gender,password,message}=this.state
     const token=Cookies.get("jwt_token")
     if(token!==undefined){
       return <Navigate replace to='/home'/>
     }
     return (
        <div className='registration'>
          <h1>Register Here</h1>  
          <form onSubmit={this.submitForm} className='form'>
           <label className='label' htmlFor='name'>EMAIL</label>
           <input placeholder='Enter your email address' className='input' id='name' type='text' onChange={this.updateName} value={email}/>
           {email==="" && <p style={{'color':'red'}}>*Required</p>}
           <label className='label' htmlFor='user'>USERNAME</label>
           <input className='input' autoComplete='off' placeholder='Enter Username' id='user' type='text' onChange={this.updateUserName} value={username}/>
           {username==='' && <p style={{'color':'red'}}>*Required</p>}
           <label htmlFor='gender'className='label'> GENDER</label>
           <select onChange={this.updateGender} id='gender' value={gender}>
             <option value='Male'>Male</option>
             <option value='Female'>Female</option>
           </select> 
           <label htmlFor='locationValue' className='label'>LOCATION</label>
           <input className='input' placeholder='Enter your Location' id='locationValue' type='text' onChange={this.updateLocation} value={loction}/>
           {loction==='' && <p style={{'color':'red'}}>*Required</p>}
           <label htmlFor='pass' className='label'>Password</label>
           <input className='input' autoComplete='off' placeholder='Enter a strong password' id='pass' type='password' onChange={this.updatePassword} value={password}/>
           {password==='' && <p style={{'color':'red'}}>*Required</p>}
           <div className='align'>
           <button type='Submit'>submit</button>
           <p>{message}</p>
           </div> 
           <p>If you have registerd please <span><Link to='/login'>Login</Link></span> hear</p>
          </form>
        </div>
     )
  }
}

export default Register