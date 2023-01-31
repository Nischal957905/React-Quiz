import React , { useState,useEffect }  from 'react'
import StartComponent from "./components/StartComponent";
import Content from './components/Content';
import { nanoid } from 'nanoid'


function App() {

  const [startQuiz, setStartQuiz] = useState(false)

  const [startAgain,setStartAgain] = useState(false)

  const [allQuizData, setAllQuizData] = useState([]);

    useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
        .then(res => res.json())
        .then(data => {
            const modifiedData = data.results.map((question) => {
                const { correct_answer, incorrect_answers } = question;
                let answers = [...incorrect_answers];
                answers.splice(Math.floor(Math.random() * (incorrect_answers.length + 1)), 0, correct_answer);
                return { 
                    ...question,
                    answers,
                    keys: nanoid()
                }
            })
        setAllQuizData(modifiedData)
        })
    }, [startAgain])

  return (
    startQuiz ? <Content allQuizData={allQuizData} setPlayAgain={setStartAgain}/> 
    : <StartComponent startQuizFunction={setStartQuiz}/>
  );
}

export default App;