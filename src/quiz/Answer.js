function Answer({answer, bullet}) {
    return (
        <div>
            <span>{bullet} - </span>
            <span>{answer.text}</span>
        </div>
    )
}

export default Answer;