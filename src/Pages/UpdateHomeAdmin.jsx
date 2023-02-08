import '@toast-ui/editor/dist/toastui-editor.css';
import style from '../Pages/UpdateHomeAdmin.module.css';
import { Editor } from '@toast-ui/react-editor';

import  { useRef, useState} from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { db  } from "../firebase";

import ImageUpdate from '../Componment/ImageUpdate';
import Sample from '../Componment/Sample';

const UpdateHomeAdmin = () => {
    const editorRef = useRef(null); 
    const toolbarItems = [ ['heading', 'bold', 'italic', 'strike'], ['hr'], ['ul', 'ol', 'task'], ['table', 'link'], ['image'], ['code'], ['scrollSync'], ] 

      const [nextId, setNextId] = useState(321);
      const [price, setprice] = useState('');
      const [roomno, setroomno] = useState('');
      const [address1, setaddress1] = useState('');
      const [address2, setaddress2] = useState('');
      const [address3, setaddress3] = useState('');
      const [address4, setaddress4] = useState('');
      const [address5, setaddress5] = useState('');
      const [people, setpeople] = useState('');
      const [lists, setLists] = useState([]);


      const putprice = (e) => {
        setprice(e.target.value);
      };
      const putroomno = (e) => {
        setroomno(e.target.value);
      };
      const putaddress1 = (e) => {
        setaddress1(e.target.value);
      };
      const putaddress2 = (e) => {
        setaddress2(e.target.value);
      };
      const putaddress4 = (e) => {
        setaddress4(e.target.value);
      };
      const putaddress3 = (e) => {
        setaddress3(e.target.value);
      };
      const putaddress5 = (e) => {
        setaddress5(e.target.value);
      };
      const putpeople = (e) => {
        setpeople(e.target.value);
      };


      const userkey = localStorage.getItem("currentUser"); 
          const addhome = async (user) => {
            const editorIns = await editorRef.current.getInstance(); 
            const contentMark =  await editorIns.getMarkdown(); 

            await setDoc(doc(db, "houseinfo", Math.random().toString(36)), {
              uid: userkey,
              Img: "",
              homeid: Math.random().toString(36),
              price: price,
              roomno :roomno,
              address1 :address1,
              address2 :address2,
              address3 :address3,
              address4 :address4,
              address5 :address5,
              people :people,
              details :contentMark,
              timestamp: new Date().toLocaleDateString() ,
              id : nextId 
            });
          };
  
          

      const submit = (e) => {
        e.preventDefault();  //새로고침 방지
        const editorIns =  editorRef.current.getInstance(); 
        const contentMark =   editorIns.getMarkdown(); 
        const about_lists = lists.concat({ //원래 있는 리스트에 붙여주기
            uid: userkey,
            homeid: Math.random().toString(36),
            Img: "",
            price: price,
            roomno :roomno,
            address1 :address1,
            address2 :address2,
            address3 :address3,
            address4 :address4,
            address5 :address5,
            people :people,
            details :contentMark,
            id : nextId ,
            timestamp: new Date().toLocaleDateString()
        });
        setNextId(nextId + 1); //id값 +1
      
        /*방금 붙여준 리스트까지 포함 된 리스트로 세팅하기*/
        setLists(about_lists); 
        setprice('');
        setroomno('');
        setaddress1('');
        setaddress2('');
        setaddress3('');
        setaddress4('');
        setaddress5('');
        setpeople('');
         //input 태그안에 있는 문자 지워주기
         addhome(userkey);

      };
      
   

    return ( <div className={style.update}>

<div> 데이터 입력 </div>

<form onSubmit={submit}>
<div> 이미지 
<Sample />
</div>

<div>가격 
<div> <input type='number'   value={price} onChange={putprice} />  </div> 
</div>
<div>방갯수
<div> <input type='number'   value={roomno}   onChange={putroomno}  />  </div> 
</div>
<div>주소
<div> 
    번지수 (House Number) <input type='text'    value={address1}  onChange={putaddress1}  />   <br />
    도로명 (Name of Street) <input type='text' alue={address2}  onChange={putaddress2} /><br />
    도시 (City) <input type='text' alue={address3}  onChange={putaddress3}/> <br />
    주 (State) <input type='text' alue={address4}  onChange={putaddress4}/> <br />
    우편번호 (Zip Code) <input type='number' value={address5} onChange={putaddress5} /></div> <br />
</div>
<div>가능인원  <input type='number'  value={people} onChange={putpeople} />  명 
  </div>
<div>상세정보 
<div>  
<Editor ref={editorRef} initialValue='' // 글 수정 시 사용 
            initialEditType='wysiwyg' // wysiwyg & markdown 
            hideModeSwitch={true} 
            height='500px' 
            usageStatistics={false} 
            toolbarItems={toolbarItems} 
            /> 
     </div>
</div>
<input type="submit" value="Submit" /> 
</form>


    </div> );
}
 
export default UpdateHomeAdmin;