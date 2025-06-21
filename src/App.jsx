import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import { Home, Test } from './Pages/Index';
import Modal from "./Components/Modal/Modal";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/tests" element={<Test />} />
      <Route path="/login" element={<Modal />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
