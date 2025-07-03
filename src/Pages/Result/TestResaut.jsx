import { useEffect, useState } from 'react';
import './TestResult.css';
import { useLocation, useNavigate } from 'react-router-dom';
import video from '../../../public/ace4939aefe5a2c294d49273022c3503.mp4'
import transition from '../../Transition';

function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers = [], levelStats = {}, totalScore = 0, userId } = location.state || {};
  const [userData, setUserData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      determineLevel(correctAnswers.length);
    }
  }, [location, navigate, correctAnswers.length]);

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
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/Users/${userId}`);
        const json = await res.json();
        setUserData(json);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

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
      level: level
    };

    try {
      const response = await fetch('http://localhost:7777/Result', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResult)
      });

      if (!response.ok) throw new Error('Failed to add user');

      const data = await response.json();
      console.log('Added data:', data);
      setIsSaved(true);
    } catch (error) {
      console.error('Error adding user:', error);
    }

    navigate('/');
  }

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
