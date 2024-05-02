import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PlantCardSelectTester({
  commonName,
  species,
  duration,
  habit,
  image,
  light,
  water,
  plantId,
}) {
  const [count,setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className='plant-card'>
      <img src={image} alt={`${commonName}`} className='plant-image-small' />
      <div className='plant-details'>
        <h3>{commonName}</h3>
        <p>
          <strong>Species:</strong> {species}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
        <p>
          <strong>Habit:</strong> {habit}
        </p>
        <p>
          <strong>Light Needs:</strong> {light}
        </p>
        <p>
          <strong>Water Needs:</strong> {water}
        </p>
        <div>
          <button className='add' onClick={handleIncrement}>+</button>
          <span>{count}</span>
          <button className='minus' onClick={handleDecrement}>-</button>
        </div>
      </div>
    </div>
  );
}

PlantCardSelectTester.propTypes = {
  commonName: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  habit: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  light: PropTypes.string.isRequired,
  water: PropTypes.string.isRequired,
  plantId: PropTypes.string.isRequired,
};

export default PlantCardSelectTester;
