import React , {useState , useEffect} from 'react';
import Card from '../../components/Card';
import "./style.css"
import DeleteModal from '../../components/DeleteModal';
import { useSelector, useDispatch } from 'react-redux'
import { setimages , removeImage } from '../../Slices/pathsSlice';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageNameDelete , setImageNameDelete] = useState("")
  const dispatch = useDispatch();
  const paths = useSelector((state) => state.images.imagesArray);

  const fetchImages = async () => {
    const response = await window.electronAPI.getSavedImages();
    if (response.success) {
      console.log(response.images)
      dispatch(setimages(response.images));
    } else {
      console.error(response.error);
    }
  };
  const deleteImage = async (imageName) => {
    const result = await window.electronAPI.deleteImage(imageName);
    if (result.success) {
      console.log(imageName)
      alert('Image deleted successfully');
    } else {
      alert('Error deleting image: ' + result.error);
    }
  };

  useEffect(() => {

    fetchImages();
  }, []);
  return (
    <div className='images-container flex flex-row flex-wrap g-1'>
      {
        paths.map((image , index)=>{

          return <>  <Card
          key={index}
           imageSrc={image.path}
           imageName={image.name}
           date={image.createdAt}
           size={image.size}
            deleteFunc={()=>{
              setIsModalOpen(true)
              setImageNameDelete(image.name)
         
          }} />

          </>
        })
      }
 <DeleteModal
        imageName={imageNameDelete}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={()=>{
          deleteImage(imageNameDelete)
          dispatch(removeImage(imageNameDelete))
          setIsModalOpen(false)
        }}
      />
    </div>
  );
};

export default Home;
