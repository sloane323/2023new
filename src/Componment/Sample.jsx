
import React, { useState, useEffect } from "react";
import {getStorage, ref, uploadBytes, listAll, getDownloadURL,} from "firebase/storage";

function Sample() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const storage = getStorage();
  const imageListRef = ref(storage, "images/");
  const deleteimg = () => {
    setImageUpload(""); }

  const upload = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  
 
   return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={upload}>업로드</button>
      {imageList.map((els) => {
        return <div> <img key={els} src={els} width='100px' height='100px' onClick={deleteimg} /> </div> 
             ;
      })}
    </div>
  );
}
export default Sample;
