import './Test.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import transition from '../../Transition';

function Tests() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [skippedIndexes, setSkippedIndexes] = useState([]);
    const [isReviewingSkipped, setIsReviewingSkipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/questions');
                const json = await res.json();
                setQuestions(json[0]);
            } catch (err) {
                console.error("Xatolik:", err);
            }
        };

        fetchData();
    }, []);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else if (skippedIndexes.length > 0 && !isReviewingSkipped) {
            setIsReviewingSkipped(true);
            setCurrentIndex(skippedIndexes[0]);
            setSkippedIndexes(prev => prev.slice(1));
            setSelectedOption(null)
        } else if (skippedIndexes.length === 0 || isReviewingSkipped) {
            setIsFinished(true);
        }
    };

    const handleDontKnow = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else if (!isReviewingSkipped && skippedIndexes.length > 0) {
            setCurrentIndex(questions.length);
        } else {
            setIsFinished(true);
        }
    };
    const handleSkip = () => {
        if (currentIndex < questions.length - 1) {
            setSkippedIndexes(prev => [...prev, currentIndex]);
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else if (skippedIndexes.length > 0 && !isReviewingSkipped) {
            setIsReviewingSkipped(true);
            setCurrentIndex(skippedIndexes[0]);
            setSkippedIndexes(prev => prev.slice(1));
            setSelectedOption(null);
        } else if (skippedIndexes.length === 0 || isReviewingSkipped) {
            setIsFinished(true);
        }
    };

    const quest = questions[currentIndex];
    if (!quest) return null
    const level = [
        { level: "Beginner", score: 1.5 },
        { level: "Elementary", score: 1.7 },
        { level: "Pre-intermediate", score: 2.0 },
        { level: "Intermediate", score: 2.5 }
    ];

    const getLevel = () => {
        if (currentIndex <= 8) return level[0];
        if (currentIndex <= 20) return level[1];
        if (currentIndex <= 33) return level[2];
        return level[3];
    };

    return (
        <section>
            <video className='video' autoPlay muted loop width="100%">
                <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
            </video>
            <div className="container">
                <div className="quiz-box">
                    {!isFinished ? (
                        <div className="quiz-card">
                            <h1>{getLevel().level} - {getLevel().score} ball</h1>
                            <div className="queestions">
                                <h2>
                                    {quest ? quest.question : "Yuklanmoqda..."}
                                </h2>
                                <div className="options">
                                    {quest && quest.options.map((opt, i) => (
                                        <label key={i}>
                                            <input
                                                name='options'
                                                type="radio"
                                                value={opt}
                                                checked={selectedOption === opt}
                                                onChange={() => setSelectedOption(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="buttons">
                                <button id='dont-btn' onClick={handleDontKnow}>Don't Know</button>
                                <button id='next-btn' onClick={handleNext} disabled={selectedOption === null}>Next</button>
                                <button id='skip-btn' onClick={handleSkip}>Skip</button>
                            </div>
                        </div>
                    ) : (
                        <div className="quiz-end">
                            <h2>All tests over</h2>
                            <NavLink to="/result">
                                <button className='result-btn'>Result</button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default transition(Tests);