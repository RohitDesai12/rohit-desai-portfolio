import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete Entry',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#202522]/60 backdrop-blur-xs"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#F7F7F2] border border-[#DDDFD8] p-6 shadow-2xl rounded-xs z-10 text-[#202522]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#202522]">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#777D78] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#DDDFD8] flex items-center justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            className="bg-red-700 hover:bg-red-800 text-[#F7F7F2]"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
