import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="*" element={<h1>Under Construction</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
