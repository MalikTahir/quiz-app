import React, { useState, useEffect } from 'react'
import { useStateValue } from '../Store/StateProvider'
import dbTests from '../../Components/FBConfig';
import {Grid} from '@material-ui/core'
import './Questions.css'

function Questions({ID}:{ID:any}) {
    const [{basket,TestDetail,StartTest,TestID},dispatch] = useStateValue()
    let firstQ:any;
    let setFirstQ:any;
    [firstQ,setFirstQ] = useState(true)
    let questions:any;
    let setQuestions:any;
    [questions,setQuestions] = useState({});
    let index:any;
    let setIndex:any;
    [index,setIndex] = useState(0);
    let score:any;
    let setScore:any;
    let wrong:any;
    let setWrong:any;
    [score,setScore] = useState(0);
    [wrong,setWrong] = useState(0);
    let Options:any;
    let setOptions:any;
    [Options,setOptions] = useState(
        {
            op1:"op1_def",
            op2:"op2_def",
            op3:"op3_def",
            op4:"op4_def"
        }
    )
    
    useEffect(()=>{
        async function fetchData(){
            await dbTests.collection('Tests').doc(TestID).collection('Quiz').onSnapshot(snapshot=>{
                setQuestions(snapshot.docs.map(doc=>(
                    doc.data()
                    
                    )))
                
            })
                            
        }
        fetchData()
        // setOptions(
        //     {
        //         op1:questions && questions[index] && questions[0].r,
        //         op2:questions && questions[index] && questions[0].w1,
        //         op3:questions && questions[index] && questions[0].w2,
        //         op4:questions && questions[index] && questions[0].w3
        //     }
        // ) 
        
    },[])
    
    
    // OnClick function
   async function optionClicked(choice1:string){

    (index+1<questions.length)?(
        nextQuestion(choice1)
    ):(
        alert("You have attempted all questions") 
    )
        
       
    }
//    function to load next question
function nextQuestion(choice:string){
    Scores(choice,questions && questions[index] && questions[index].r)
       setFirstQ(false)
        setIndex(++index)
        setOptions({})
        let list:string[]=[];
         list.push(questions && questions[index] && questions[index].r)
         list.push(questions && questions[index] && questions[index].w1);
         list.push(questions && questions[index] && questions[index].w2);
         list.push(questions && questions[index] && questions[index].w3);
        setOps(list)
} 
//    function for setting the options
function setOps(list:string[]){
    
    let randomList:string[]=[];
    let OP1= list[Math.floor(Math.random() * 5000) % 4]
    let nm = 4;
    while(nm>0){
        let listIndex:any;
        listIndex = (Math.floor((Math.random() * 5000))) % (nm)
        
        randomList.push(list[listIndex])
        list.splice(listIndex,1)
        --nm
    }
    
    setOptions(
        {
            
            op1:randomList.pop(),
            op2:randomList.pop(),
            op3:randomList.pop(),
            op4:randomList.pop()
        }
    )
}
function Scores(choice:string,right:string){

   let vr = choice.localeCompare(right)
    if(vr == 0){
        setScore(++score)
    }
    else{
        setWrong(++wrong)
    }
}
    console.log(TestID)
    console.log(questions)
    
    return (
        <Grid className='ql'  container spacing={1}>
            <Grid className="ql__score">
            <span> Right : {score}</span>
            <span> Wrong : {wrong}</span>
            </Grid>
            <Grid xs={12} sm={4} className="ql__q">
            <span>Question {index+1} / {questions.length}</span>
            <Grid  className="ql__card">
                <Grid className="ql__statement">
                {questions && questions[index] && questions[index].statement}
                </Grid>
                <Grid onClick={()=>{optionClicked((firstQ)?(questions && questions[index] && questions[index].r):(Options["op1"]))}} className="ql__options">
                    (A1) {(firstQ)?(questions && questions[index] && questions[index].r):(Options["op1"])}
                    
                </Grid>
                <Grid onClick={()=>{optionClicked(Options["op2"])}} className="ql__options">
                   
                (B) {(firstQ)?(questions && questions[index] && questions[index].w1):(Options["op2"])}
                </Grid>
                <Grid onClick={()=>{optionClicked(Options["op3"])}} className="ql__options">
                   
                (C) {(firstQ)?(questions && questions[index] && questions[index].w2):(Options["op3"])}
                </Grid>
                <Grid onClick={()=>{optionClicked(Options["op4"])}} className="ql__options">
                  
                (D) {(firstQ)?(questions && questions[index] && questions[index].w3):(Options["op4"])}
                </Grid>
            
            </Grid>
            {/* MIMI questions with MIMI options, Choose right MIMI
            {TestID}
            <br></br>
            {questions && questions[1] && questions[1].statement} */}
            </Grid>
        </Grid>
    )
}

export default Questions
