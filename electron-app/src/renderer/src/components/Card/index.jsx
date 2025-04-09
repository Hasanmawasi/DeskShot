import React , {useState} from 'react';
import "./style.css"
import ImageModal from '../ImageModal';
const Card = ({imageSrc , deleteFunc , imageName , date , size}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='card-container flex flex-col'>

      <div className="image-container">

        <ImageModal
        imageUrl={imageSrc}
         isOpen={isModalOpen}
        onClose={()=>{
          setIsModalOpen(false)
        }} />
        <img className='image' src={imageSrc} alt="picture"  onClick={
        () => setIsModalOpen(true)
      }/>
        <div className='delete-container' onClick={deleteFunc}>
          <img className='delete-icon'  src='src/assets/delete.svg'  />
        </div>
      </div>
      <div className="bottom">
        <div className=" flex flex-row justify-space-between mt-3">
          <div className="image-name">
            <p>{imageName}</p>
          </div>
          <div className="edit-container">
            <img className='edit-icon' src="src/assets/edit.svg" alt="picture" />
          </div>
        </div>
        <div className="flex flex-row justify-space-between mt-2">
          <div className="created-at ">
            {date}
          </div>
          <div className="size">
            <p>{size}KB</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
