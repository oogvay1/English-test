import { useNavigate } from 'react-router-dom';
import './Test.css';
import { useState, useEffect } from 'react';

function Tests() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/beginner');
                const json = await res.json();
                setQuestions(json[0]);
            } catch (err) {
                console.error("Xatolik:", err);
            }
        };

        fetchData();
    }, []);


    const [skipped, setSkipped] = useState([]);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (skipped.length > 0) {
            setQuestions(skipped);
            setSkipped([]);
            setCurrentIndex(0);
        } else {
            navigate('/test-result')
        }
    };

    const handleSkip = () => {
        const skippedQuestion = questions[currentIndex];
        setSkipped(prev => [...prev, skippedQuestion]);

        const newQuestions = questions.filter((_, i) => i !== currentIndex);
        setQuestions(newQuestions);

        if (currentIndex >= newQuestions.length) {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        }
    };


    const quest = questions[currentIndex];

    return (
        <section>
            <video className='video' autoPlay muted loop width="100%">
                <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
            </video>
            <div className="container">
                <div className="quiz-box">
                    <div className="quiz-card">
                        <h1>Beginner</h1>
                        <div className="queestions">
                            <h2>
                                {quest ? quest.question : 'Yuklanmoqda...'}
                            </h2>
                            <div className="options">
                                {quest && quest.options.map((opt, i) => (
                                    <label key={i}>
                                        <input name='options' type="radio" />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="buttons">
                            <button id='dont-btn'>Don't Know</button>
                            <button id='next-btn' onClick={handleNext}>Next</button>
                            <button id='skip-btn' onClick={handleSkip}>Skip</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tests;
