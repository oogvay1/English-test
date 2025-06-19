import { Route, Router, Routes, useLocation } from "react-router-dom"
import Layout from "./Layouts/Layout"
import { Home, Test } from './Pages'
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import Header from "./Components/Header/Header";

function App() {

  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/tests" element={<Test />} />
        </Routes>
      </AnimatePresence>


    </>
  );
}

export default App
