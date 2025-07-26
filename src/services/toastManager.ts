// Toast manager class for handling toasts outside of React components
class ToastManager {
  private listeners: ((message: string) => void)[] = [];

  showToast(message: string) {
    this.listeners.forEach(listener => listener(message));
  }

  subscribe(listener: (message: string) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const toastManager = new ToastManager();
