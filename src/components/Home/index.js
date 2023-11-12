import {Component} from 'react'
import {Navigate,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component{

    render(){
    const token=Cookies.get("jwt_token")
    if(token===undefined){
     return <Navigate replace to='/login'/>
    }
    return (
    <div>
        <Header/>
        <div className='body'>
        <h1 className='typing-animation'>Enjoy learning the language and get progressed</h1>
        <Link to='/exercise/english' className='link'>
            <div className='exercise'>
                <h1>English Exercise</h1>
                <button type='button'>&gt;</button>
            </div>
        </Link>
        <Link to='/exercise/telugu' className='link'>
        <div className='exercise'>
                <h1>Telugu Exercise</h1>
                <button type='button'>&gt;</button>
            </div>
        </Link>
        </div>
     </div>
    )
}
}

export default Home