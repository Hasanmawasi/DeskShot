import React , {useState} from 'react';
import "./style.css"
import InputField from '../../components/Input';
import Button from '../../components/Button';
const UploadPhoto = () => {
  const [imagePreview, setImagePreview] = useState("src/assets/camira.jpg");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
const reader = new FileReader();
reader.onloadend = () => {
  setImagePreview(reader.result); // base64 data URL
};
reader.readAsDataURL(file);
  };
  return (

    <div className='upload-container'>


      <div className="input-container">
        <InputField
        label={"photo"}
        placeholder={"Choose your photo"}
        type='file'
        onChange={handleFileChange}
        />
          </div>
        <div className="edit-photo ">
          <div className="upl-image">
            <img src={imagePreview} alt="" />
          </div>
          <div className="bottom flex flex-row align-center justify-space-between p-1">
            <div className="icons flex flex-row g-1">
            <img className='edit-icon' src="src/assets/rotate.svg" alt="picture" />
             <img className='edit-icon' src="src/assets/crop.svg" alt="picture" />
             <img className='edit-icon' src="src/assets/effect.svg" alt="picture" />
            </div>

              <Button
                label={"Save"}
                style={"save-button"}
              />

          </div>
        </div>

    </div>
  );
};

export default UploadPhoto;
