
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Product from './Pages/Product';
import Login from './Pages/Login';
import Main from './Pages/Main';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { GET_CURRENT_USER_INFO } from "./modules/user";
import { doc,  getDoc } from "firebase/firestore";
import { db } from "./firebase";
import UpdateHomeAdmin from './Pages/UpdateHomeAdmin';
import CustomerName from './Componment/CustomerName';

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
        <Route path="/update" element={< UpdateHomeAdmin />} />
      </Routes>
      ) :  (
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/customername" element={<CustomerName />}></Route>
          <Route path="/update" element={< UpdateHomeAdmin />} />

        </Routes>
        
      )
      }

    </div>
  );
}

export default App;
