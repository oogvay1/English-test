import './Test.css'
function Tests() {
    return (
        <>
            <section>
                <video className='video' autoPlay muted loop width="100%">
                    <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
                </video>
                <div className="container">
                    <div className="question-box">
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tests