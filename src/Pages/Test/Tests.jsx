import './Test.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import transition from '../../Transition';
import video from '../../../public/ace4939aefe5a2c294d49273022c3503.mp4';

function Tests() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [isReviewingSkipped, setIsReviewingSkipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [showEndButton, setShowEndButton] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [countdown, setCountdown] = useState(1);
    const [totalScore, setTotalScore] = useState(0);

    const [levelStats, setLevelStats] = useState({
        Beginner: 0,
        Elementary: 0,
        "Pre-intermediate": 0,
        Intermediate: 0
    });

    const navigate = useNavigate();

    const levels = [
        { level: "Beginner", score: 1.5 },
        { level: "Elementary", score: 1.7 },
        { level: "Pre-intermediate", score: 2.0 },
        { level: "Intermediate", score: 2.5 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://english-test-11.onrender.com/questions');
                const json = await res.json();

                const combinedQuestions = [
                    ...json.Beginner.map(q => ({ ...q, level: "Beginner" })),
                    ...json.Elementary.map(q => ({ ...q, level: "Elementary" })),
                    ...json["Pre-Intermediate"].map(q => ({ ...q, level: "Pre-intermediate" })),
                    ...json.Intermediate.map(q => ({ ...q, level: "Intermediate" }))
                ];

                setQuestions(combinedQuestions);
            } catch (err) {
                console.error("Xatolik:", err);
            }
        };
        fetchData();
    }, []);

    const getLevel = (quest) => {
        return levels.find(l => l.level === quest.level);
    };

    const handleNext = () => {
        const quest = isReviewingSkipped ? skippedQuestions[currentIndex] : questions[currentIndex];
        const selectedLetter = selectedOption?.split('.')[0];
        const currentLevel = getLevel(quest);

        if (selectedLetter === quest.answer) {
            setCorrectAnswers(prev => [...prev, quest.id]);
            setLevelStats(prev => ({
                ...prev,
                [currentLevel.level]: prev[currentLevel.level] + 1
            }));
            setTotalScore(prev => prev + currentLevel.score);
        }

        goToNextQuestion();
    };

    const handleSkip = () => {
        const quest = isReviewingSkipped ? skippedQuestions[currentIndex] : questions[currentIndex];
        setSkippedQuestions(prev => [...prev, quest]);
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        if (isReviewingSkipped) {
            if (currentIndex < skippedQuestions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedOption(null);
            } else {
                setShowEndButton(true);
            }
        } else {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedOption(null);
            } else if (skippedQuestions.length > 0) {
                setIsReviewingSkipped(true);
                setCurrentIndex(0);
                setSelectedOption(null);
            } else {
                setShowEndButton(true);
            }
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
    };

    useEffect(() => {
        let timer;
        if (isFinished) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        navigate('/result', {
                            state: {
                                correctAnswers,
                                levelStats,
                                totalScore,
                                userId: localStorage.getItem("userId")
                            }
                        });
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isFinished, correctAnswers, levelStats, totalScore, navigate]);

    const quest = isReviewingSkipped ? skippedQuestions[currentIndex] : questions[currentIndex];
    if (!quest && !showEndButton) return null;

    return (
        <section>
            <video className='video' autoPlay muted loop width="100%">
                <source src={video} type="video/mp4" />
            </video>
            <div className="container">
                <div className="quiz-box">
                    {!isFinished && (
                        <div className="quiz-card">
                            {showEndButton ? (
                                <div className="end-test">
                                    <h2>Test finished!</h2>
                                    <button className='finish-btn' onClick={handleFinish}>Go to Results</button>
                                </div>
                            ) : (
                                <>
                                    <div className="questions">
                                        <h2>{quest.level}</h2>
                                        <h2>{quest.question}</h2>
                                        <div className="options">
                                            {quest.options.map((opt, i) => (
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
                                    <div className="line"></div>
                                    <div className="buttons">
                                        <button id='next-btn' onClick={handleNext} disabled={selectedOption === null}>Next</button>
                                        <button id='skip-btn' onClick={handleSkip}>Skip</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default transition(Tests);
