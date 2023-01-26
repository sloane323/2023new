import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../modules/login";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleLogin = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            dispatch(LOGIN(user.uid));
            console.log("구글로그인성공!");
            navigate("/");

          }).catch((error) => {
            console.log("구글로그인실패!");
          });

          
      };

    return ( 
        <div>
            < button onClick={googleLogin}> Google Login </button>
        </div>
     );
}
 
export default Login;