import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomerName from "../Componment/CustomerName";
import Items from "../Componment/Items";

const Main = () => {
    const isLogincheck = useSelector((state) => state.login.isLoggedIn);

    return ( <div>
        <div>
               <input type='text' />  <br />
        </div>
        <div>
        <select>
            <option value='룸쉐어'> 룸쉐어</option>
            <option value='룸메이트'> 룸메이트</option>
            <option value='싱글아파트'>싱글아파트 </option>
            <option value='싱글하우스'>싱글하우스 </option>
            <option value='커뮤니티콘도'> 커뮤니티콘도</option>
        </select>
        <select>
            <option value='가격대'> 가격대</option>
            <option value='위치'> 위치</option>
            <option value='방갯수'>방갯수 </option>
            <option value='화장실갯수'>화장실갯수 </option>
            <option value='파킹갯수'> 파킹갯수</option>
        </select>
        <button> Save Search </button> 

        { !isLogincheck ? ( 
        <Link to ='/login'><button>Sign in</button></Link> 
        ) : ( <div> <button> <Link to ='/update'> 상품등록 </Link></button><CustomerName /> </div>) }
        


        </div> <hr />
         Rental Listings <br />
         00,000 Results<br />
         <Items />

        <div> <button> 더보기 </button></div>
    </div> );
}
 
export default Main;