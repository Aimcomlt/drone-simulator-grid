import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMap } from '../../redux/mapSlice';

const MapSelector = () => {
  const dispatch = useDispatch();
  const { currentMap, maps } = useSelector((state) => state.map);

  const handleChange = (event) => {
    dispatch(setMap(event.target.value));
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '10px',
      borderRadius: '8px',
      color: 'white',
      fontFamily: 'monospace'
    }}>
      <label htmlFor="map-select"><strong>Select Map:</strong></label>
      <select id="map-select" value={currentMap} onChange={handleChange} style={{ marginLeft: '10px' }}>
        {maps.map((map) => (
          <option key={map} value={map}>
            {map.charAt(0).toUpperCase() + map.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapSelector;

