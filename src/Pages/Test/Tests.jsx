import './Test.css';
import { useState, useEffect } from 'react';

function Tests() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

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

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        }
    };

    const quest = questions[currentIndex];

  const level = [
    { level: "Beginner", score: 1.5 },
    { level: "Elementary", score: 1.7 },
    { level: "Pre-intermediate", score: 2.0 },
    { level: "Intermediate", score: 2.5 }
  ];

    return (
        <section>
            <video className='video' autoPlay muted loop width="100%">
                <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
            </video>
            <div className="container">
                <div className="quiz-box">
                    <div className="quiz-card">
                        <h1><h1>{level[0].level} - {level[0].score} ball</h1></h1>
                        <div className="queestions">
                            <h2>
                                {quest ? quest.question : 'Yuklanmoqda...'}
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
                            <button id='dont-btn'>Don't Know</button>
                            <button id='next-btn' onClick={handleNext} disabled={selectedOption === null}>Next</button>
                            <button id='skip-btn'>Skip</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tests;