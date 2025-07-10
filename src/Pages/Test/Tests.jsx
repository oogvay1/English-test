import './Test.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import transition from '../../Transition';

function Tests() {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [isReviewingSkipped, setIsReviewingSkipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [showEndButton, setShowEndButton] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [countdown, setCountdown] = useState();
    const [allLevels, setAllLevels] = useState({});
    const [Levelselected, setLevelSelected] = useState();
    const [userLevel, setUserLevel] = useState('');
    const [totalLenght, setTotalLenght] = useState(null);
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
                console.log("Fetched questions:", json);
                setAllLevels(json);
            } catch (err) {
                console.error("Xatolik:", err);
            }
        };
        fetchData();
    }, []);

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

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchData = async () => {
            try {
                const res = await fetch(`https://english-test-11.onrender.com/Users/${userId}`);
                const json = await res.json();
                console.log(json.category)
                setUserLevel(json.category);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        if (userId) fetchData();
        console.log(userLevel && userLevel)
    }, []);

    useEffect(() => {
        const selected = userLevel;

        if (selected) {
            handleLevelSelect(selected);
        }
    }, [userLevel]);

    const getLevel = (quest) => {
        return levels.find(l => l.level === quest.level);
    };

    const handleLevelSelect = (combo) => {

        let beginner = [];
        let elementary = [];
        let preIntermediate = [];
        let intermediate = [];

        const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

        switch (combo) {
            case "Beginner":
                beginner = allLevels.Beginner?.map(q => ({ ...q, level: "Beginner" })) || [];
                setQuestions(shuffle(beginner));
                break;
            case "Elementary":
                elementary = allLevels.Elementary?.map(q => ({ ...q, level: "Elementary" })) || [];
                setQuestions(shuffle(elementary));
                break;
            case "Pre-Intermediate":
                preIntermediate = allLevels["Pre-Intermediate"]?.map(q => ({ ...q, level: "Pre-intermediate" })) || [];
                setQuestions(shuffle(preIntermediate));
                break;
            case "Intermediate":
                intermediate = allLevels.Intermediate?.map(q => ({ ...q, level: "Intermediate" })) || [];
                setQuestions(shuffle(intermediate));
                break;
            case "Beg - Ele":
                beginner = shuffle(allLevels.Beginner?.map(q => ({ ...q, level: "Beginner" })) || []);
                elementary = shuffle(allLevels.Elementary?.map(q => ({ ...q, level: "Elementary" })) || []);
                setQuestions([...beginner, ...elementary]);
                break;
            case "Ele - Pre-Inter":
                elementary = shuffle(allLevels.Elementary?.map(q => ({ ...q, level: "Elementary" })) || []);
                preIntermediate = shuffle(allLevels["Pre-Intermediate"]?.map(q => ({ ...q, level: "Pre-intermediate" })) || []);
                setQuestions([...elementary, ...preIntermediate]);
                break;
            case "Pre-Inter - Inter":
                preIntermediate = shuffle(allLevels["Pre-Intermediate"]?.map(q => ({ ...q, level: "Pre-intermediate" })) || []);
                intermediate = shuffle(allLevels.Intermediate?.map(q => ({ ...q, level: "Intermediate" })) || []);
                setQuestions([...preIntermediate, ...intermediate]);
                break;
            case "All":
                beginner = shuffle(allLevels.Beginner?.map(q => ({ ...q, level: "Beginner" })) || []);
                elementary = shuffle(allLevels.Elementary?.map(q => ({ ...q, level: "Elementary" })) || []);
                preIntermediate = shuffle(allLevels["Pre-Intermediate"]?.map(q => ({ ...q, level: "Pre-intermediate" })) || []);
                intermediate = shuffle(allLevels.Intermediate?.map(q => ({ ...q, level: "Intermediate" })) || []);
                setQuestions([...beginner, ...elementary, ...preIntermediate, ...intermediate]);
                break;
            default:
                setQuestions([]);
        }

        setCurrentIndex(0);
        setSkippedQuestions([]);
        setCorrectAnswers([]);
        setIsReviewingSkipped(false);
        setShowEndButton(false);
        setSelectedOption(null);
    };
    
    useEffect(() => {
        let timer;
        setTotalLenght(questions.length);
        if (isFinished) {
            setCountdown(3);
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        navigate('/result', {
                            state: {
                                correctAnswers,
                                levelStats,
                                totalScore,
                                totalLenght,
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

    if (!quest && !showEndButton) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Loading...</h1>
                <p>Make sure the server and selected level are working.</p>
            </div>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="quiz-box">
                    {!isFinished && (
                        <div className="quiz-card">
                            {showEndButton ? (
                                <div className="end-test">
                                    <h2>Test finished!</h2>
                                    <button className='finish-btn' onClick={() => setIsFinished(true)}>Go to Results</button>
                                </div>
                            ) : (
                                <>
                                    <div className="questions">
                                        <h2 className='level'>{quest.level}</h2>
                                        <h2 className='queestion'>{currentIndex + 1}. {quest.question}</h2>
                                        <div className="options">
                                            {quest.options.map((opt, i) => (
                                                <label key={i}>
                                                    <input
                                                        name='options' type="radio"
                                                        value={opt} checked={selectedOption === opt}
                                                        onChange={() => setSelectedOption(opt)} />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="buttons">
                                        <button id='next-btn' onClick={handleNext} disabled={selectedOption === null}>Next</button>
                                        <button id='skip-btn' onClick={handleSkip} disabled={selectedOption !== null}>Skip</button>
                                        <button className='finish-btn' onClick={() => setShowEndButton(true)}>Finish</button>
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