import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class AddQuestions extends Component{
  state={
    question:'',
    optionFr:'',
    optionSe:'',
    optionTh:'',
    answer:'',
    language:'English',
    marks:2,
    message:''
  }


  updateQuestion=(event)=>{
    this.setState({question:event.target.value});
  }

  updateOptionFr=(event)=>{
    this.setState({optionFr:event.target.value})
  }

  updateOptionSe=(event)=>{
    this.setState({optionSe:event.target.value})
  }

  updateOptionTh=(event)=>{
    this.setState({optionTh:event.target.value})
  }

  updateAnswer=(event)=>{
    this.setState({answer:event.target.value})
  }

  updateLaunguage=(event)=>{
    console.log(event.target.value)
    this.setState({language:event.target.value})
  }

  updateMarks=(event)=>{
    this.setState({marke:event.target.value})
  }

  getData=async (event)=>{
    event.preventDefault()
    const {question,optionFr,optionSe,optionTh,answer,language,marks}=this.state
    if(question!=='' && optionFr!=='' && optionSe!=='' && optionTh!==''&&answer!==''){
        //start post
        const url='https://backrnd.onrender.com/exercise'
        const questionDetails={
            'question':question,
            "optionFr":optionFr,
            "optionSe":optionSe,
            "optionTh":optionTh,
            "answer":answer,
            "language":language,
            "marks":marks
        }
        const token=Cookies.get("jwt_token")
        const options={
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body:JSON.stringify(questionDetails)
        }
        const data=await fetch(url,options)
        const dataResponse=await data.json()
        this.setState({message:dataResponse.message})
    }
    else{
        this.setState({message:'Fill the form Completly'})
    }
  }

  render(){
    const one=1
    const five=5
    const {question,optionFr,optionSe,optionTh,answer,message}=this.state
    return(
        <div>
        <Header/>
        <div className='registration body'>
          <h1>Add question</h1>  
          <form onSubmit={this.getData} className='form'>
           <label className='label' htmlFor='question'>QUESTION</label>
           <input placeholder='Enter your question here' className='input' id='question' type='text' onChange={this.updateQuestion} value={question}/>
           <label className='label' htmlFor='option1'>OPTION 1</label>
           <input className='input' autoComplete='off' placeholder='Enter option' id='option1' type='text' onChange={this.updateOptionFr} value={optionFr}/>
           <label className='label' htmlFor='option2'>OPTION 2</label>
           <input className='input' autoComplete='off' placeholder='Enter option' id='option2' type='text' onChange={this.updateOptionSe} value={optionSe}/>
           <label className='label' htmlFor='option3'>OPTION 3</label>
           <input className='input' autoComplete='off' placeholder='Enter option' id='option3' type='text' onChange={this.updateOptionTh} value={optionTh}/>
           <label className='label' htmlFor='answer'>Answer</label>
           <input className='input' autoComplete='off' placeholder='Enter Answer' id='answer' type='text' onChange={this.updateAnswer} value={answer}/>
        
           <label htmlFor='language'className='label'>LANGUAGE</label>
           <select onClick={this.updateLaunguage} id='language'>
             <option value='English'>English</option>
             <option value='Telugu'>Telugu</option>
           </select> 
           <select onClick={this.updateMarks} id='marks'>
             <option value={one} >2</option>
             <option value={five}>5</option>
           </select> 
           <div className='align'>
           <button type='Submit'>submit</button>
           <p>{message}</p>
           </div> 
          </form>
          </div>
        </div>
    )
  }
}

export default AddQuestions