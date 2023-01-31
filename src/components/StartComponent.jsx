export default function StartComponent(props) {

    const offStartVar = (
        <div className="container-start">
            <div className='startContent'>
                <h1>Quizzical</h1>
                <p>See how well you do on this IQ test</p>
                <button onClick={() => props.startQuizFunction(true)}>Start quiz</button>
            </div>
        </div>
    )
    
    return offStartVar
}