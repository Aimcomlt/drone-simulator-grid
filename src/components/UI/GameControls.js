import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame } from '../../redux/settingsSlice';

const GameControls = () => {
  const dispatch = useDispatch();
  
    // Safely access isGameStarted with a fallback value
    const isGameStarted = useSelector((state) => state.settings?.isGameStarted || false);

  const buttonStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '5px',
  };

  const containerStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    zIndex: 10,
  };

  return (
    <div style={containerStyle}>
      {!isGameStarted ? (
        <button
          style={buttonStyle}
          onClick={() => dispatch(startGame())}
        >
          Open MiniMap
        </button>
      ) : (
        <button
          style={buttonStyle}
          onClick={() => dispatch(endGame())}
        >
          Close MiniMap
        </button>
      )}
    </div>
  );
};

export default GameControls;
