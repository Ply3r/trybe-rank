import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectQuiz from './pages/Select-quiz';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/select-quiz" element={ <SelectQuiz /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
