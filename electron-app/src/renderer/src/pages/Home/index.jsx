import React from 'react';
import Card from '../../components/Card';
import "./style.css"
import ImageModal from '../../components/Modal';
const Home = () => {
  return (
    <div className='images-container flex flex-row flex-wrap'>
      <Card />
      {/* <ImageModal imageUrl={"src/assets/logo.png"} /> */}
    </div>
  );
};

export default Home;
