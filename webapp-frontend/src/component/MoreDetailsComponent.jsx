import React from 'react';
import { useLocation } from 'react-router-dom';
import BodimeCarousel from './BodimeCarousel';
function MoreDetailsComponent() {
  const style = {
    paddingLeft: window.innerWidth >= 1024 ? '100px' : '60px',
    paddingRight: window.innerWidth >= 1024 ? '100px' : '60px',
  };

  const location = useLocation();
  const { name, price, rating, chairs, fans, tables, nets, address, distance,photos } = location.state || {};
  console.log(photos);
  return (
    
    <div style={style}>
      <BodimeCarousel image={photos}/>
      {/* Top Section: Title and Reviews */}
      <div style={{ backgroundColor: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{name}</h1>
        <div style={{ textAlign: 'right', padding: '0 20px', color: 'green' }}>4.5 Stars | 450 Reviews</div>
      </div>
      <hr />

      {/* Price and Location Info */}
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '100%' }}>
        {/* First Line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <div>💰 Rs. {price} for one person</div>
          <div>📍 {distance} km from University of Ruhuna</div>
        </div>

        {/* Second Line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <div>🏠 {address}</div>
          <div>🕑 Contact numbers</div>
        </div>
      </div>

      {/* Other Available Features Section */}
      <h3 style={{ marginTop: '20px' }}>Other Available Features</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px 0',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e0f7fa', padding: '10px 20px', borderRadius: '10px'
        }}>
          <div>Number of Beds</div>
          <div>{nets} beds available</div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e0f7fa', padding: '10px 20px', borderRadius: '10px'
        }}>
          <div>Number of Tables</div>
          <div>{tables} tables available</div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e0f7fa', padding: '10px 20px', borderRadius: '10px'
        }}>
          <div>Number of Chairs</div>
          <div>{chairs} chairs available</div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e0f7fa', padding: '10px 20px', borderRadius: '10px'
        }}>
          <div>Kitchen</div>
          <div>Available</div>
        </div>
      </div>
    
    </div>
  )
}

export default MoreDetailsComponent;

