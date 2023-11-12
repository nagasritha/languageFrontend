import {Component} from 'react'
import {CirclesWithBar} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class UserDetails extends Component{
    state={
        dataList:[],
        success:'',
    }

    componentDidMount(){
        this.getData()
    }

    getData=async ()=>{
        this.setState({status:'loading'})
        const url='https://backrnd.onrender.com/users';
        const token=Cookies.get('jwt_token')
        const options={
            method:'GET',
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }
        const data=await fetch(url,options);
        if(data.status===200){
        const dataResponse=await data.json()
        console.log(dataResponse);
        this.setState({dataList:dataResponse,status:'success'})
        }else{
            this.setState({status:'failure'})
        }
    }

    loadingView=()=><div className='align-center'>
        <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
</div>

    getDetails=(item)=>{
        const {id,username,email,location}=item
        const colors=['red','blue','green','pink','voilet','#a84832','#fc03ca','#a11685'];
        const randomColor=colors[Math.ceil(Math.random()*8)]
        console.log(randomColor)
        return <li key={id} className='card'>
            <h1 className='profile' style={{"backgroundColor":randomColor}}>{username[0]}</h1>
            <div>
            <h2>{username}</h2>
            <p><b>Email: </b>{email}</p>
            <p><b>Location:</b>{location}</p>
            </div>
        </li>
    }

    success=()=>{
    const {dataList}=this.state
    return(
        <ul>
            {dataList.map(item=>this.getDetails(item))}
        </ul>
    )
    }

    failure=()=><h1>Failure</h1>

    getResult=()=>{
        const {status}=this.state
        switch(status){
            case 'loading':
                return this.loadingView()
            case 'success':
                return this.success()
            case 'failure':
                return this.failure()
            default:
                return null            
        }
    }

    render(){
        return (
        <div>
            <Header/>
            <div className='body'>
            <h1>User Details</h1>
            {this.getResult()}
            </div>
        </div>
        )    
}
}

export default UserDetails