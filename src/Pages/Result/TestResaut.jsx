import { useEffect, useState } from 'react';
import './TestResult.css';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers = [], levelStats = {}, totalScore = 0 } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/Users');
        const json = await res.json();
        setQuestions(json);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:7777/Result');
        const json = await res.json();
        setResult(json);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    fetchData();
  }, []);


  return (
    <section>
      <video className='video' autoPlay muted loop width="100%">
        <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="result-box">
          <div className="result-card">
            <div className="results">
              {questions.length > 0 && (
                <h2 className='result-name'>{questions[questions.length - 1].name} {questions[questions.length - 1].lastname}</h2>
              )}
              <h2 className='answers-text'>Correct answers: {correctAnswers.length}</h2>
              <h2 className='answers-text'>Total Score: {totalScore}</h2>
            </div>
            <div className="buttons">
              <NavLink to={'/'}>
                <button style={{ color: "black" }} className='save-btn'>Save to back home</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestResult;
