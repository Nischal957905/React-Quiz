import parse from 'html-react-parser'
import AnswerItem from './AnswerItem';


export default function QuizAnswers(props){

    const renderAnswer = props.answers.map((item,index) => {
        return(
            <AnswerItem 
                item={item} 
                parentKey={props.keyUsage} 
                key={index}
                keyForUsage={index}
                function={(answer) => props.function(answer)}
                checkAnswer={props.checkAnswer}
                correct_answer={props.correct_answer}
                submitted_answer={props.submittedAnswer}
            />
        )
    })

    const itemVar = (
        <div className="question-container">
                <h2>{parse(props.question)}</h2>
                <div className='answer-container'>
                    {renderAnswer}
                </div>
                <div className="line-divider"></div>
        </div>
    )
    return itemVar
}