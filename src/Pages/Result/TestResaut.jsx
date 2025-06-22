import './TestResult.css';
import { useLocation, NavLink } from 'react-router-dom';

function TestResult() {
  const location = useLocation();
  const { correctAnswers, dontKnowCount } = location.state || {};

  return (
    <section>
      <video className='video' autoPlay muted loop width="100%">
        <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="result-box">
          <div className="result-card">
            <div className="results">
              <h2>To‘g‘ri javoblar: {correctAnswers?.length || 0}</h2>
              <h2>“Don't Know”lar soni: {dontKnowCount || 0}</h2>
            </div>
            <div className="buttons">
              <NavLink to={'/'}>
                <button className='seve-btn'>Seve to back home</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestResult;
