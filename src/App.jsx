import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./Layouts/Layout"
import { Home, Test } from './Pages/Index'
import { AnimatePresence } from "framer-motion"
import Header from "./Components/Header/Header";
import Modal from "./Components/Modal/Modal"
import TestResult from "./Pages/Result/TestResaut"
import ScrollVelocity from "./Components/Background/Background"
import './Components/Background/Background.css'
import img from '../src/assets/imgs/11427f39c15a1b292c23c__2_-removebg-preview.png'
function App() {

  const location = useLocation();
  console.log(ScrollVelocity)

  return (
    <>
      <ScrollVelocity
        texts={[<img className='backraund-img' src={img} alt="Img" />,
        <img className='backraund-img' src={img} alt="Img" />,
        <img className='backraund-img' src={img} alt="Img"/>,
        <img className='backraund-img' src={img} alt="Img" />,
        <img className='backraund-img' src={img} alt="Img"/>,
        <img className='backraund-img' src={img} alt="Img" />,
        <img className='backraund-img' src={img} alt="Img"/>,
        <img className='backraund-img' src={img} alt="Img"/>,]}
        velocity={50}
        className="custom-scroll-text"
      />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Modal />} />
          <Route path="/result" element={<TestResult />} />
          <Route path="/tests" element={<Test />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App
