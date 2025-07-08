import { useEffect, useState } from 'react';
import './TestResult.css';
import { useLocation, useNavigate } from 'react-router-dom';
import video from '../../../public/ace4939aefe5a2c294d49273022c3503.mp4';
import transition from '../../Transition';

function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers = [], totalScore = 0, userId } = location.state || {};
  const [userData, setUserData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [level, setLevel] = useState('');

  // 🧠 Determine user level based on correct answers
  const determineLevel = (correctCount) => {
    if (correctCount >= 1 && correctCount <= 9) {
      setLevel('Beginner');
    } else if (correctCount >= 10 && correctCount <= 21) {
      setLevel('Elementary');
    } else if (correctCount >= 22 && correctCount <= 34) {
      setLevel('Pre-intermediate');
    } else if (correctCount >= 35) {
      setLevel('Intermediate');
    } else {
      setLevel('No Level');
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      determineLevel(correctAnswers.length);
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`https://english-test-11.onrender.com/Users/${userId}`);
        const json = await res.json();
        setUserData(json);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    if (userId) fetchData();
  }, [location, userId]);

  const AddData = async () => {
    if (!userData) return;

    const newResult = {
      name: userData.name,
      lastname: userData.lastname,
      age: userData.age,
      birthdate: userData.birthdate,
      phoneNumber: userData.phone,
      score: Math.floor(totalScore),
      correctAnswers: correctAnswers.length,
      level,
      category: userData.category,
      branch: userData.branch
    };
    console.log(newResult)

    try {
      const response = await fetch('https://english-test-11.onrender.com/Result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      });

      if (!response.ok) throw new Error('Failed to save result');

      await fetch('https://english-test-11.onrender.com/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      });

      setIsSaved(true);
      navigate('/');
    } catch (err) {
      console.error("❌ Error submitting result:", err);
    }
  };

  return (
    <section>
      <video className='video' autoPlay muted loop width="100%">
        <source src={video} type="video/mp4" />
      </video>
      <div className="container">
        <div className="result-box">
          <div className="result-card">
            <div className="results">
              {userData && (
                <h2 className='result-name'>{userData.name} {userData.lastname}</h2>
              )}
              <h2 className='answers-text'>Correct answers: {correctAnswers.length}</h2>
              <h2 className='answers-text'>Total Score: {Math.floor(totalScore)}</h2>
              <h2 className='answers-text'>Your Level: {level}</h2>
              <h2 className='answers-text'>Category: {userData?.category}</h2>
            </div>
            <div className="buttons">
              <button
                style={{ color: "black" }}
                className='save-btn'
                onClick={AddData}
                disabled={isSaved}
              >
                {isSaved ? "Saved!" : "Save and go to study"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default transition(TestResult);
