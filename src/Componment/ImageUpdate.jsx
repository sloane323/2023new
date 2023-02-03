import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const ImageUpdate = () => {
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(100);
  
    const handleImage = (event) => {
      const image = event.target.files[0];
      setImage(image);
      console.log(image);
      setError("");
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      if (image === "") {
        console.log("파일이 선택되지 않았습니다");
        setError("파일이 선택되지 않았습니다");
        return;
      }
      // 업로드 처리
      console.log("업로드 처리");
      const storageRef = storage.ref("images/test/"); //어떤 폴더 아래에 넣을지 설정
      const imagesRef = storageRef.child(image.name); //파일명
  
      console.log("파일을 업로드하는 행위");
      const upLoadTask = imagesRef.put(image);
      console.log("태스크 실행 전");
  
      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
          setProgress(percent);
        },
        (error) => {
          console.log("err", error);
          setError("파일 업로드에 실패했습니다." + error);
          setProgress(100); //진행중인 바를 삭제
        },
        () => {
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
          });
        }
      );
    };

    return ( 
        <div>
           
     
        <input type="file" onChange={handleImage} />
        <button onClick={onSubmit}>업로드</button>
     
     
      {imageUrl && (
        <div>
          <img width="400px" src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
            
   
     );
}
 
export default ImageUpdate;