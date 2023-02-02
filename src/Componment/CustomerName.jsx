import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { db } from "../firebase";
import {  getDoc, doc } from "firebase/firestore";
import {LOGOUT} from "../modules/login"
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const CustomerName = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.login.currentUser);


const [name, setName] = useState();
const [email, setemamil] = useState();
const docRef = doc(db, "user", currentUser);

useEffect(()=>{  
  async function getUsers() {
    const docSnap = await getDoc(docRef);  
if (docSnap.exists()) {
 //  console.log("Document data:", docSnap.data());
  const userinfo = docSnap.data()
  // console.log(userinfo);
  setName (userinfo.name);
  setemamil (userinfo.email)
} else {
  // doc.data() will be undefined in this case
 //  console.log("No such document!");
} return docSnap.data; 
      
}; getUsers(); } ,100);

  // 로그아웃
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(LOGOUT());
        console.log("로그아웃성공");
        navigate('/');
      })
      .catch((error) => {
        console.log("로그아웃실패");
      });
  };


    return ( <div>


{ !name  ? <div> </div>
  :  <p>  {name}  님 안녕하세요. </p>
        
}

<button className="simplebtn" onClick={onLogOutClick}>로그아웃</button> 

    </div>  );
}
 
export default CustomerName;