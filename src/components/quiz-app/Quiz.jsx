import { useState } from "react"
import { quiz } from "./Quiz-Question"



export const Quiz =()=>{
    const [activeQuestions,setActiveQuestions] = useState(0)
    const [selectedAnswer,setSelectedAnswer] = useState('')
    const [result,setResult] = useState({
        scores: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const {questions} = quiz;
    const { question, choices,correctAnswer } = questions[activeQuestions] 

    const onClickNext = () =>{
            setSelectedAnswerIndex(null)
            setActiveQuestions((prev)=> prev + 1)
            setResult((prev)=>
                selectedAnswer
                ?{
                    ...prev,
                    scores: prev.scores + 5,
                    correctAnswers: prev. correctAnswers + 1
                } : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1
                }
                
            )
            if (activeQuestions !== questions.length - 1) {
              } else {
                setActiveQuestions(0)
                setShowResult(true)
              }
            
        }
            const onAnswerSelected = (answer,index) =>{
                setSelectedAnswerIndex(index)
                if (answer === correctAnswer ){
                    setSelectedAnswer(true)
                } else {
                    setSelectedAnswer(false)
                }
            }
    return(
        <>
    { !showResult     
        ? <div>
            <h1> Quiz </h1>
            <p> {question} </p>
            <ul>
                {choices.map((answer, index)=> 
                <li 
                onClick={()=>onAnswerSelected(answer, index)} key={answer} 
                className={selectedAnswerIndex === index ? 'selected-answer' : null}> 
                        {answer} 
                </li>
                )}
            </ul>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                {activeQuestions === questions.length - 1 ?"Finish" : "Next"}
                </button>
                </div>
               :( <div>
                <h3> Result </h3> 
                <p>
                     Total Question : <span> {questions.length} </span>
                </p>
                <p>
                     Total Score <span> {result.scores} </span>
                </p>
                <p>
                     Correct Answer <span> {result.correctAnswers} </span>
                </p>
                <p>
                     Wrong Answer <span> {result.wrongAnswers} </span>
                </p>
             </div>)}
            
        </>
    )
}