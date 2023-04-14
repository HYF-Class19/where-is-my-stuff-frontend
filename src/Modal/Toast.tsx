import React from 'react';
import { IonToast } from '@ionic/react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isOpen, onDismiss }) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      message={message}
      duration={4000}
      position="bottom"
    />
  );
};

export default Toast;
