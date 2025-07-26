import { toastManager } from '../services/toastManager';

export const useToast = () => {
  return {
    showToast: (message: string) => toastManager.showToast(message)
  };
};

export { toastManager };
