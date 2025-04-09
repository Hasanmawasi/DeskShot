import React , {useState} from 'react';
import "./style.css"
import ImageModal from '../Modal';
const Card = ({imageSrc , deleteFunc}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='card-container flex flex-col'>

      <div className="image-container" onClick={
        () => setIsModalOpen(true)
      }>

        <ImageModal
        imageUrl={imageSrc}
         isOpen={isModalOpen}
        onClose={()=>{
           console.log("close");
          setIsModalOpen(false)
        }} />
        <img className='image' src={imageSrc} alt="picture" />
        <div className='delete-container' onClick={deleteFunc}>
          <img className='delete-icon'  src='src/assets/delete.svg'  />
        </div>
      </div>
      <div className="bottom">
        <div className=" flex flex-row justify-space-between mt-3">
          <div className="image-name">
            <p>image.pmg</p>
          </div>
          <div className="edit-container">
            <img className='edit-icon' src="src/assets/edit.svg" alt="picture" />
          </div>
        </div>
        <div className="created-at mt-2">
          2/4/2025
        </div>
      </div>
    </div>
  );
};

export default Card;
