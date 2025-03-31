import {useEffect, useRef, useCallback} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {PaymentSocketEvent} from '@/types/PaymentSocketEvent';

export const usePaymentSocket = (
  identifier: string,
  view: string,
  onMessage: (data: PaymentSocketEvent) => void,
) => {
  const socketRef = useRef<WebSocket | null>(null); // Lógica de background/foreground
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const isFocused = useIsFocused();

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const connectSocket = useCallback(() => {
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
      if (onMessageRef.current) {
        try {
          const parsedData = JSON.parse(event.data);
          onMessageRef.current(parsedData);
        } catch (error) {
          console.warn('Error parsing WebSocket message:', error);
        }
      }
    };

    socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = event => {
      console.log('WebSocket closed:', event.code, view);
    };
  }, [identifier, view]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      console.log('Cleaning up WebSocket to', view);
      socketRef.current.close();
      socketRef.current = null;
    }
  }, [view]);

  useFocusEffect(
    useCallback(() => {
      connectSocket();

      return () => {
        disconnectSocket();
      };
    }, [connectSocket, disconnectSocket]),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const prevState = appStateRef.current;
      appStateRef.current = nextAppState;

      if (prevState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App returned to foreground');
        if (
          isFocused &&
          (!socketRef.current ||
            socketRef.current.readyState !== WebSocket.OPEN)
        ) {
          connectSocket();
        }
      }

      if (nextAppState.match(/inactive|background/)) {
        disconnectSocket();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [connectSocket, disconnectSocket, isFocused]);

  return socketRef;
};
