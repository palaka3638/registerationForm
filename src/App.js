import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Home from './components/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form />}></Route>
    <Route path='home' element={<Home />}></Route>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
