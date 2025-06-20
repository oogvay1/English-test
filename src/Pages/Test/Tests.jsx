import './Test.css'

function Tests() {
    return (
        <>
            <section>
                <video className='video' autoPlay muted loop width="100%">
                    <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
                </video>
                <div className="container">
                    <div className="quiz-box">
                        <div className="quiz-card">
                            <h1>Beginner</h1>
                            <div className="queestions">
                                <h2>1 ......................... old are you?</h2>
                                <div className="options">
                                    <label><input name='q1' type="radio" />How </label>
                                    <label><input name='q1' type="radio" />Who </label>
                                    <label><input name='q1' type="radio" />What </label>
                                </div>
                            </div>
                            <div className="buttons">
                                <button id=''>Topa olmadim</button>
                                <button id='next-btn'>Next</button>
                                <button id=''>Tashlab ketish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tests