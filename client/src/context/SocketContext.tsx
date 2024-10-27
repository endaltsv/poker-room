// context/SocketContext.tsx
import React, { createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:3000'); // Замените на URL вашего сервера
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
