import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';

const ImageUpdate = () => {
    const [attachment, setAttachment] = useState() ;
    const [file, setFile] = useState('')
    const code = Math.random().toString(36);
    const userkey = localStorage.getItem("currentUser"); 

    const onFileChange = (e) => {
        const { files } = e.target;
        const theFile = files[0];
        // FileReader의 Instance 생성
        const reader = new FileReader();
        // eventListener
        reader.onloadend = (e) => {
          const { result } = e.currentTarget;
          // attachment state를 data_url형식의 string값으로 업데이트
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
      
      const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = '';
        // 사진 첨부를 안할 수도 있기 때문에 조건문
        if (attachment !== '') {
          // uuid library 사용
          const fileRef = storage.ref().child(`${userkey}/${code()}`);
          // putString method로 file 업로드
          const response = await fileRef.putString(attachment, 'data_url');
          // getDownloadURL method로 file 다운로드
          attachmentUrl = await response.ref.getDownloadURL();
        }
        const messageObj = {
          createdAt: Date.now(),
          creatorId: userkey,
          attachmentUrl,
        };
        await db.collection('postse').add(messageObj);
        setAttachment('');
      };

    return ( <div>
        
        <div>

        <input type="file" accept="image/*" onChange={onFileChange} value={file}/>
        <button onClick={onsubmit}> 제출하기 </button> 
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="attachment"/>
          </div>
        )}


    </div>

    </div> );
}
 
export default ImageUpdate;