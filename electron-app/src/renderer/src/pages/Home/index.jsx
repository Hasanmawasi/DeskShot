import React , {useState , useEffect} from 'react';
import Card from '../../components/Card';
import "./style.css"
import ImageModal from '../../components/Modal';
const Home = () => {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const response = await window.electronAPI.getSavedImages();
    if (response.success) {
      console.log(response.images)
      setImages(response.images);
    } else {
      console.error(response.error);
    }
  };
  const deleteImage = async (imagePath) => {
    const result = await window.electronAPI.deleteImage(imagePath);
    if (result.success) {
      alert('Image deleted successfully');
      fetchImages(); // Refresh the images after deletion
    } else {
      alert('Error deleting image: ' + result.error);
    }
  };

  useEffect(() => {

    fetchImages();
  }, []);
  return (
    <div className='images-container flex flex-row flex-wrap'>
      {
        images.map((image , index)=>{
          console.log(image);
          return <Card key={index} imageSrc={image} deleteFunc={()=>{
            deleteImage("");
          }} />
        })
      }
    </div>
  );
};

export default Home;
