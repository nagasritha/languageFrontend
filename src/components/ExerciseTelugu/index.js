import {Component} from 'react'
import Cookies from 'js-cookie'
import { CirclesWithBar } from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class ExerciseTelugu extends Component{
    state={
        dataList:[],
        status:'loading',
        quizz:true,
        score:0,
        error:'',
    }

    componentDidMount(){
        this.getData()
    }

    getData=async ()=>{
        this.setState({status:'loading'})
        const url='https://backrnd.onrender.com/questions/Telugu';
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
        this.setState({dataList:dataResponse,status:'success',quizz:true});
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

updateOption=async (question,selected)=>{
    console.log(question,selected)
    const optionDetails={
        "question":question,
        "selected":selected,
    }
    const url='https://backrnd.onrender.com/exercise'
    const options={
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
       body:JSON.stringify(optionDetails)
    }
    const post=await fetch(url,options)
    const postData=await post.json()
    console.log(postData)
}

resetSelectedOptions=()=>{
    const {dataList}=this.state
    console.log(dataList)
    dataList.map(item=>this.updateOption(item.question,""))
}

submitForm=async (event)=>{
    event.preventDefault();
    const token=Cookies.get("jwt_token")
    const url='https://backrnd.onrender.com/correctAnswers/Telugu';
    const options={
        method:'GET',
        headers: {
         'Authorization':`Bearer ${token}`
        }
    }
    const data=await fetch(url,options)
    const dataResponse=await data.json()
    if(data.status===200){
        await this.setState({quizz:false,score:dataResponse.score,error:''})
        this.updateScore(dataResponse.score)
        this.resetSelectedOptions()
    }else{
        this.setState({error:dataResponse.error})
    }
    console.log(dataResponse)
  } 

  updateScore=async (score)=>{
    const url='https://backrnd.onrender.com/score'
    const token=Cookies.get("jwt_token")
    const options={
        method:'PUT',
        headers:{
            "Content-Type":"application/json", 
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({"score":score})
    }
    const data=await fetch(url,options)
    const dataResult=await data.json()
    console.log(dataResult)

}
   question=(item)=>{
    const {question,optionFr,optionSe,optionTh,id}=item
    return <li key={id}>
        <form className='questionCard'>
    <h2>{question}</h2>
    <div>
    <input type='radio' name='option' id={`${optionFr} ${id}`} value={optionFr} onClick={()=>this.updateOption(question,optionFr)}/>
    <label htmlFor={`${optionFr} ${id}`}>{optionFr}</label>
    </div>
  <div>
  <input type='radio' name='option' id={`${optionSe} ${id}`} value={optionSe} onClick={()=>this.updateOption(question,optionSe)}/>
  <label htmlFor={`${optionSe} ${id}`}>{optionSe}</label>
  </div>
  <div>
  <input type='radio' name='option' id={`${optionTh} ${id}`} value={optionTh} onClick={()=>this.updateOption(question,optionTh)}/>
  <label htmlFor={`${optionTh} ${id}`}>{optionTh}</label>
  </div>
  </form>
    </li>
  
   }

   success=()=>{
        const {dataList,quizz,error}=this.state
        if(quizz){
            return (
           <div>     
            <ol>
                {dataList.map(item=>this.question(item))}
            </ol>
            <div style={{'textAlign':'right'}}>
            <button className='button' type='button' onClick={this.submitForm}>Submit</button>
            <p>{error}</p>
          </div>
         </div> 
        )}
        return this.Reassesment()
    } 

   updateQuizz=()=>{
    this.setState({quizz:true})
   }

    Reassesment=()=>{
        const {score}=this.state
        return (
            <div className='align-center-to-the-page'>
                <h1>You have completed the quizz</h1>
                <h2><b>Your Score:</b>{`${score}/40`}</h2>
                <button type='button' onClick={this.updateQuizz} className='button'>Retake</button>
            </div>
        )
    }

    getOutPut=()=>{
        const {status}=this.state
        switch(status){
          case 'loading':
            return this.loadingView()
          case 'success':
            return this.success()
          case 'failure':
            return (
                <div className='align-center' style={{'height':'100vh'}}>
                    <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          width={50}
        />
                    <button onClick={this.getData} type='button' className='button'>Retry</button>
                </div>
            )  
         default:
            return null   
        }
    }


    render(){
        return <div>
           <Header/>
           <div className='body'>
           <h1>Here starts your quizz</h1>
            
            <b>NOTE:</b>
            <ul>
            <li>To get evaluted all the questions has to be attempted</li>
            <li>Marks are give based on the difficulty level of the question</li>
            <li>The Quizz is for 40 marks</li>
            </ul>
         {this.getOutPut()}
           </div>
        </div>
    }
}

export default ExerciseTelugu