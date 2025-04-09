import React , {useState} from 'react';
import "./style.css"
import InputField from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux'
import { addImage } from '../../Slices/pathsSlice';
const UploadPhoto = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("src/assets/camira.jpg");
  const [imagePath, setImagePath] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // base64 data URL
      setImagePath(reader.result);
      // base64 data URL
    };
    reader.readAsDataURL(file);
};

const handleSaveImage = async () => {
  if (!imagePath) {
    alert("Please upload an image first.");
    return;
  }

  try {
    const result = await window.electronAPI.saveImage(imagePath);
    if (result.success) {
      dispatch(addImage({
        name:result.name,
        path:result.path,
        createdAt:result.createdAt,
        size:result.size}))
      alert(" Image saved successfully to: " + result.path);

    } else {
      alert(" Failed to save: " + result.error);
    }
  } catch (err) {
    console.error("IPC error:", err);
    alert("Unexpected error: " + err.message);
  }
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
                onClick={handleSaveImage}
              />

          </div>
        </div>

    </div>
  );
};

export default UploadPhoto;
