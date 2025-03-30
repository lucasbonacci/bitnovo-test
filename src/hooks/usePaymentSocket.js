import {useRef, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

export const usePaymentSocket = (identifier, view, onMessage) => {
  const socketRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (!identifier) return;

      const socket = new WebSocket(
        `wss://payments.pre-bnvo.com/ws/merchant/${identifier}`,
      );
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected to:', view);
      };

      socket.onmessage = event => {
        console.log('WebSocket message:', event.data);
        if (onMessage) {
          try {
            const parsedData = JSON.parse(event.data);
            onMessage(parsedData);
          } catch (e) {
            console.warn('Error parsing WebSocket message:', e);
          }
        }
      };

      socket.onerror = error => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = event => {
        console.log('WebSocket closed:', event.code, event.reason, view);
      };

      return () => {
        console.log('Cleaning up WebSocket to', view);
        socket.close();
      };
    }, [identifier]),
  );

  return socketRef;
};
