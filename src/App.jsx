import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import { Home, Test } from './Pages'

const App = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/tests" element={<Test />} />
    </Route>
  ) 
)

export default App
