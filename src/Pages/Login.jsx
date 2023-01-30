import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../modules/login";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createUser = async (user) => {
      await setDoc(doc(db, "user", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber,
        timestamp: new Date().toLocaleDateString()
      });
    };

    const provider = new GoogleAuthProvider();

    const googleLogin = (e) => {
      console.log("로그인?")
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // 로그인된 결과를 구글인증을 통해서 확인 > 토큰 발급
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          //console.log(user);
  
          const checkDoc = async () => {
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            if (!docSnap.exists()){
              createUser(user);
              console.log("실행")
            }  
          } 
          checkDoc();
          navigate("/product");
          dispatch(LOGIN(user.uid));
          console.log("구글로그인성공!")
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    };

    return ( 
        <div>
            < button onClick={googleLogin}> Google Login </button>
        </div>
     );
}
 
export default Login;