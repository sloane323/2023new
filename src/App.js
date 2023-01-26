
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Product from './Pages/Product';
import Login from './Pages/Login';
import Main from './Pages/Main';

function App() {
  return (
    <div className="App">
     
     <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/login" element={<Login />} />
        </Routes>

    </div>
  );
}

export default App;
