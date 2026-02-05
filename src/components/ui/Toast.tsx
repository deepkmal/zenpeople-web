import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  variant?: 'success' | 'error';
}

export function Toast({ message, isVisible, onClose, duration = 5000, variant = 'success' }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const Icon = variant === 'error' ? XCircle : CheckCircle;
  const iconColor = variant === 'error' ? 'text-red-500' : 'text-green-500';

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 bg-white shadow-lg border border-gray-200 px-4 py-3 rounded-lg max-w-sm transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      <p className="text-gray-700 text-sm flex-1">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
