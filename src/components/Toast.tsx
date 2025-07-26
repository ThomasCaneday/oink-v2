import { useState, useEffect, useCallback } from 'react';
import { toastManager } from '../services/toastManager';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

interface ToastContainerProps {
  className?: string;
}

export const ToastContainer = ({ className = '' }: ToastContainerProps) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((message: string) => {
      const id = nextId;
      setNextId(prev => prev + 1);
      setToasts(current => [...current, { id, message }]);
    });
    return () => unsubscribe();
  }, [nextId]);

  const removeToast = useCallback((id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  return (
    <div className={`toast-container ${className}`}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
