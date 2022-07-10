import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  return (
    <div>
      <Header/>
      <main>  
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Routes>

      </main>
    </div>
  )
}

export default App;
