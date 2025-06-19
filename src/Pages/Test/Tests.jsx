import './Test.css'

function Tests() {
    return (
        <>
            <section>
                <video className='video' autoPlay muted loop width="100%">
                    <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
                </video>
                <div className="container">
                    <div className="question-boxs">
                        <div className="question-box">
                            <h1>Beginner</h1>
                            <div className="queestions">
                                <h2>1 ......................... old are you?</h2>
                                <div className="option">
                                    <label><input name='q1' type="radio" />How </label>
                                    <label><input name='q1' type="radio" />Who </label>
                                    <label><input name='q1' type="radio" />What .......... </label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>2 Where ......................... ?</h2>
                                <div className="option">
                                    <label><input name='q2' type="radio" /> you from </label>
                                    <label><input name='q2' type="radio" />you are from </label>
                                    <label><input name='q2' type="radio" />you are from </label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>3 Our car isn’t fast. It’s very ......................... .</h2>
                                <div className="option">
                                    <label><input name='q3' type="radio" />weak </label>
                                    <label><input name='q3' type="radio" />short </label>
                                    <label><input name='q3' type="radio" />slow ..........</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>4 My mother likes Mel Gibson, but she ......................... Arnold Schwarzenegger.</h2>
                                <div className="option">
                                    <label><input name='q4' type="radio" />likes</label>
                                    <label><input name='q4' type="radio" />don’t like </label>
                                    <label><input name='q4' type="radio" />doesn’t like ..........</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>5 We usually watch a football match ......................... Saturday afternoon.</h2>
                                <div className="option">
                                    <label><input name='q5' type="radio" />in</label>
                                    <label><input name='q5' type="radio" />on</label>
                                    <label><input name='q5' type="radio" />at ..........</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>6 The programme starts at ten ......................... .</h2>
                                <div className="option">
                                    <label><input name='q6' type="radio" />o’clock</label>
                                    <label><input name='q6' type="radio" />clocks</label>
                                    <label><input name='q6' type="radio" />hours ..........</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>7 Where ......................... ?</h2>
                                <div className="option">
                                    <label><input name='q7' type="radio" />do you work</label>
                                    <label><input name='q7' type="radio" />you do work</label>
                                    <label><input name='q7' type="radio" />you work</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>8 That’s her over there – ......................... a green dress and a hat.</h2>
                                <div className="option">
                                    <label><input name='q8' type="radio" />she wears</label>
                                    <label><input name='q8' type="radio" />she’s wearing</label>
                                    <label><input name='q8' type="radio" />she wearing</label>
                                </div>
                            </div>
                            <div className="queestions">
                                <h2>9 People usually eat soup with ......................... .</h2>
                                <div className="option">
                                    <label><input name='q9' type="radio" />a knife</label>
                                    <label><input name='q9' type="radio" />a fork</label>
                                    <label><input name='q9' type="radio" />a spoon</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tests