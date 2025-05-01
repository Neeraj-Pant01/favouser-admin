import React, { useState } from 'react'
import { uploadItemImage } from '../utils/uploads/uploadSingleImage';


const UploadImage = () => {
    const [img, setImg] = useState<File | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    }
    const checkUpload = async () =>{
        if(img){
            const resp = await uploadItemImage(img);
            console.log(resp)
        }
    }

    return (
        <div>
            <img className='w-[300px] h-[300px] rounded-full' src={img ? URL.createObjectURL(img) : ""} alt="" />
            <input type="file" onChange={handleImage} />
            <button onClick={checkUpload}>upload</button>
        </div>
    )
}

export default UploadImage
