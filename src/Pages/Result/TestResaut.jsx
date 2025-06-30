import { useEffect, useState } from 'react';
import './TestResult.css';
import { useLocation, NavLink } from 'react-router-dom';

function TestResult() {
  const location = useLocation();
  const { correctAnswers, dontKnowCount, levelStats } = location.state || {};
  const [questions, setQuestions] = useState([]);

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

  let overall = {

  };
  console.log(levelStats)

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
                <h2>{questions[questions.length - 1].name} {questions[questions.length - 1].lastname}</h2>
              )}

              <h2>{correctAnswers}</h2>

              <h2>“Don't Know”lar soni: {dontKnowCount || 0}</h2>
            </div>
            <div className="buttons">
              <NavLink to={'/'}>
                <button className='seve-btn'>Save to back home</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestResult;
