import React from 'react'

function TestResult() {

  return (
    <>
      <section>
        <video className='video' autoPlay muted loop width="100%">
          <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
        </video>

        <div className="test-result">
          <div className="container">
            <div className="result">
              <h1></h1>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TestResult
