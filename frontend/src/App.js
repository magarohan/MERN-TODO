import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CustomNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
