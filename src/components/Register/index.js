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
    const {email,password,username,location,gender}=this.state
    if(email!=="" || password!=="" || username!=="" || location!==""){
      const userDetails={
          "username":username,
          "email":email,
          "password":password,
          "gender":gender,
          "location":location
      }
      console.log(JSON.stringify(userDetails))
      const options={
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body:JSON.stringify(userDetails)
      }
      const url='https://backrnd.onrender.com/register'
      const result=await fetch(url,options)
      if(result.status===200){
        return this.setState({'success':true,'message':'user registerd', email:'',
        username:'',
        gender:'Male',
        password:'',
        location:'',
       })
      }
      return this.setState({'message':'user already exists'})  
    }
     
    }  


  render() {
     const {name,username,loction,gender,password,success,message}=this.state
     const token=Cookies.get("jwt_token")
     if(token!==undefined){
       return <Navigate replace to='/home'/>
     }
     return (
        <div className='registration'>
          <h1>Register Here</h1>  
          <form onSubmit={this.submitForm} className='form'>
           <label className='label' htmlFor='name'>EMAIL</label>
           <input placeholder='Enter your email address' className='input' id='name' type='text' onChange={this.updateName} value={name}/>
           {name==="" && <p style={{'color':'red'}}>*Required</p>}
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
           {success ? <div>
                        <p style={{'color':'green'}}>{message} <span><Link to='/login'>Login</Link> now</span></p>
                      </div>
                      :
                      <p style={{'color':'red'}}>{message}</p>
                      }
           </div> 
           <p>If you have already register please <span><Link to='/login'>Login</Link></span> hear</p>
          </form>
        </div>
     )
  }
}

export default Register