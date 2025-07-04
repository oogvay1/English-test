import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./Layouts/Layout"
import { Home, Test } from './Pages/Index'
import { AnimatePresence } from "framer-motion"
import Header from "./Components/Header/Header";
import Modal from "./Components/Modal/Modal"
import TestResult from "./Pages/Result/TestResaut"
function App() {

  const location = useLocation();

  return (
    <>
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
