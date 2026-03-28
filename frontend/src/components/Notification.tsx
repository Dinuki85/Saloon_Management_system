'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-600 shadow-green-500/20',
    error: 'bg-red-600 shadow-red-500/20',
    info: 'bg-purple-600 shadow-purple-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-8 right-8 z-[200] px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-2xl ${colors[type]}`}
    >
      <div className="flex items-center gap-3">
        <span>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        {message}
      </div>
    </motion.div>
  );
};
