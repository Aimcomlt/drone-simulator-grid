import { useEffect, startTransition } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updateJoystickData } from '../redux/droneSlice';

const useJoystick = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('joystick-data', (data) => {
      // Use startTransition for non-urgent state updates
      startTransition(() => {
        dispatch(updateJoystickData({
          roll: data.roll ?? 0,
          pitch: data.pitch ?? 0,
          yaw: data.yaw ?? 0,
          throttle: data.throttle ?? 0,
          buttons: data.buttons ?? [],
        }));
      });
    });

    return () => socket.disconnect();
  }, [dispatch]);
};

export default useJoystick;
