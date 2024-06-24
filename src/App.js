import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Home from './components/Home';
import AuthProvider from './authContext/AuthContext';
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>

    <Routes>
    <Route path='/' element={<Form />}></Route>
      <Route path='/register' element={<Form />}></Route>
    <Route path='home' element={<Home />}></Route>

    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
