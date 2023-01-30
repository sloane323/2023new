
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Product from './Pages/Product';
import Login from './Pages/Login';
import Main from './Pages/Main';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./modules/login";
import { GET_CURRENT_USER_INFO } from "./modules/user";
import { doc,  getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const dispatch = useDispatch();
  const isLogincheck = useSelector((state) => state.login.isLoggedIn);
  const currentUser = useSelector((state) => state.login.currentUser);

  const getCurrentUserInfo = async () => {
    const docRef = doc(db, "userList", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(GET_CURRENT_USER_INFO(docSnap.data()));
    }
  };
  //렌더링 시 마다 로컬스토리지에 있는 currentUser를 통해 로그인 여부 판단


  return (
    <div className="App">

      { !isLogincheck ? (
        <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      ) :  (
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
        </Routes>
        
      )
      }

    </div>
  );
}

export default App;
