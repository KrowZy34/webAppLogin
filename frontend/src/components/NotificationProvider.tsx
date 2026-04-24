import React, { createContext, useState, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';

type NotificationType = 'success' | 'error' | '';

interface NotificationContextProps {
  notify: (msg: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notify: () => {}
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [msg, setMsg] = useState('');
  const [type, setType] = useState<NotificationType>('');
  const [show, setShow] = useState(false);

  const notify = useCallback((newMsg: string, newType: NotificationType) => {
    setMsg(newMsg);
    setType(newType);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3200);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div id="notif" className={`${show ? 'show' : ''} ${type}`}>
        {msg}
      </div>
    </NotificationContext.Provider>
  );
};
