import React, { useState } from "react"
import QuizAnswers from "./QuizAnswers";


export default function Content({ allQuizData,setPlayAgain }) {

    const [matchAns, setMatchAns] = useState(false)

    const [totalMarks, setTotalMarks] = useState()

    const [checkSubmit, setCheckSubmit] = useState({
        correctAnswer: false,
        wrongAnswer:true,
        heldState: false,
        submit: false
    })

    const [arrAnswers, setArrAnswers] = useState([])

    const [submittedComponents, setSubmittedComponents] = useState(['Default Value']);

    function validAllQuestionAnswered(){
        let answerSubmittedCount = 0
        for(let s=0; s<allQuizData.length; s++){
            for(let t=0; t<arrAnswers.length; t++){
                if(allQuizData[s].keys === arrAnswers[t].parentKey){
                    answerSubmittedCount++
                }
            }
        }
        return answerSubmittedCount
    }

    function calculateTotalMarks(){
        let rightAnswers = 0
            for(let k=0; k<arrAnswers.length; k++){
                for(let m=0; m<allQuizData.length; m++){
                    if(allQuizData[m].keys === arrAnswers[k].parentKey){
                        if(allQuizData[m].correct_answer === arrAnswers[k].value){
                            rightAnswers++
                        }
                    }
                }
            }
            return rightAnswers
    }
    
    function handleSubmit() {

        if(validAllQuestionAnswered() === 5){

            setMatchAns(true)
            setCheckSubmit(prevVal => {
                return {
                    ...prevVal,
                    submit: true
                 }
            })

            setTotalMarks(calculateTotalMarks())
        }
        else{
            alert("Answer all the questions.")
        }   
    }

    function handlePlayAgain(){
        setPlayAgain(prevVal => !prevVal)
        setMatchAns(false)
        setTotalMarks()
        setCheckSubmit({})
        setArrAnswers([])
        setSubmittedComponents(['Deafult Value'])
    }

    function selectAsAnswer(answer) {

        setArrAnswers((prevVal) => {

            let foundVal = false
            for(let i=0; i<submittedComponents.length; i++){
                if(submittedComponents[i] === answer.parentKey){
                    foundVal = true
                }
            }

            let varSt = []
            
            if(!foundVal){
                varSt = [...prevVal,answer]
                setSubmittedComponents(prevValSt => [...prevValSt,answer.parentKey])
            }
            else{
                const mapArray = arrAnswers.map((item) => {
                    if(item.parentKey === answer.parentKey){
                        return {
                            ...answer
                        }
                    }
                    else{
                        return {
                            ...item
                        }
                    }
                })
                varSt = mapArray
            }
            return varSt   
        })
    }

    function findAnswerToQuestion(questionId){
        let arrToRetrn
        for(let m=0; m<arrAnswers.length; m++){
            if(arrAnswers[m].parentKey === questionId){
                arrToRetrn = {...arrAnswers[m]}
                break;
            }
        }
        return arrToRetrn
    }

    const varst = allQuizData.map((item) => {
        const submittedAnswerObj = findAnswerToQuestion(item.keys)
        return (
            <QuizAnswers
                key={item.keys}
                keyUsage={item.keys}
                question={item.question}
                answers={item.answers}
                correct_answer={item.correct_answer}
                function={selectAsAnswer}
                checkAnswer={matchAns ? checkSubmit : {}}
                submittedAnswer={submittedAnswerObj ? submittedAnswerObj : { }}
            />
        )
    })

    const onStartVar = (
        <div className="main-question">
            {varst}
            <div className="button-holder">
                {matchAns && <h3 className="score-notify">You scored {totalMarks}/5 correct answers</h3>}
                <button onClick={!checkSubmit.submit ? handleSubmit : handlePlayAgain}>
                    {!checkSubmit.submit ? 'Check answers' : 'Play Again'}
                </button>
            </div>
        </div>
    )

    return onStartVar
}

