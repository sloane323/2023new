import React, { useState, useEffect } from 'react';
import 'firebase/storage';
import { db , storage  } from "../firebase";

const ImageUpdate = () => {

  const [attachment, setAttachment] = useState() 
  const [file, setFile] = useState('')
  const uuidv4 = Math.floor(Math.random() * 2 ** 20).toString(16);
  const userkey = localStorage.getItem("currentUser"); 


  console.log(userkey)

  const onFileChange = (event) => {
    const {target:{files, value}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    setFile(value)
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result}} = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => {
    setAttachment(null)
    setFile('')
  };


  const onSubmit = async (event) => {
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storage.ref().child(`${userkey}/${uuidv4}`);
      const response = await attachmentRef.putString(attachment, "data_url")
      attachmentUrl = await response.ref.getDownloadURL()
    }
    const postObj = {
        createdAt: Date.now(),
        creatorId: userkey,
        attachmentUrl,
    }
    await db.collection("posts").add(postObj);
 
    setAttachment('');
    setFile('')
  };



    return ( 
        <div>

     
        <input type="file" accept="image/*" onChange={onFileChange} value={file}/>
        <button onClick={onSubmit}>Update</button>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="attachment"/>
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
 

    </div>
            
   
     );
}
 
export default ImageUpdate;