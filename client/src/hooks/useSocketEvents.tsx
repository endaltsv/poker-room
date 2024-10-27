// src/hooks/useSocketEvents.ts

import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

type EventHandlers = {
  [event: string]: (...args: any[]) => void;
};

export const useSocketEvents = (eventHandlers: EventHandlers) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, eventHandlers]);
};
