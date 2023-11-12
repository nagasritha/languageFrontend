import {Component} from 'react'
import {Link,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component{
    state={
        username:'',
        password:'',
        error:'',
        success:false,
        email:''
    }

    updateName=(event)=>{
        this.setState({username:event.target.value})
      }
    
    success=(token)=>{
       Cookies.set('jwt_token',token,{expires:30})
       this.setState({error:'',username:'',password:'',success:true})
    }

    updatePassword=(event)=>{
        this.setState({password:event.target.value})
    }

      submitDetails=async (event)=>{
        event.preventDefault()
        console.log("I am called")
        const {username,password,email}=this.state
        const userDetails={username,email,password}
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userDetails)
        }
        const url="https://backrnd.onrender.com/login"
        const details= await fetch(url,options)
        console.log(details)
        if(details.status===200){
            const data=await details.json()
            this.success(data.jwtToken)
        }else{
            this.setState({error:"Invalid User Details"})
        }
      }

      updateEmail=(event)=>{
        this.setState({email:event.target.value})
      }

      render(){
        const {username,password,error,success,email}=this.state
        console.log(error)
        const token=Cookies.get("jwt_token")
        if(token!==undefined){
          return <Navigate replace to='/home'/>
        }
        return (
          <div className='registration'>
            <form className='form' onSubmit={this.submitDetails}>
                <h2 className='h2'>Enter your details to login</h2>
                <label htmlFor='email'>Email</label>
                <input className='input' type='text' onChange={this.updateEmail} value={email} placeholder='Enter email address'/>
                <label id='username' className='label'>Username</label>
                <input className='input' type='text' onChange={this.updateName} value={username} placeholder='Enter Username'/>
                <label id='password' className='label'>Password</label>
                <input className='input' type='password' onChange={this.updatePassword} value={password} placeholder='Enter Password'/>
                <div className='align'>
                    <button type='submit'>
                        Login
                    </button>
                    <p style={{'color':'red'}}>{error}</p>
                    {success && <div>
                        <p>Your login is Successfull, Move on to <span><Link to='/home'>Home</Link></span> page</p>
                        </div>}
                </div>
            </form>
          </div>
        )
      }
}

export default Login