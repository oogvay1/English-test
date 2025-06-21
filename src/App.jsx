import { Route, Router, Routes, useLocation } from "react-router-dom"
import Layout from "./Layouts/Layout"
import { Home, Test } from './Pages/Index'
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import Header from "./Components/Header/Header";
import Modal from "./Components/Modal/Modal"
import TestResalt from "./Pages/Test/TestResalt"

function App() {

  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/tests" element={<Test />} />
          <Route path="/login" element={<Modal />} />
          <Route path="/result" element={<TestResalt />} />
        </Routes>
      </AnimatePresence>


    </>
  );
}

export default App
