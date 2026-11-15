import React, { useState } from 'react';
import { Upload, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadInputProps {
  label: string;
  value?: string;
  accept?: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  value,
  accept = 'image/*,.pdf',
  onChange,
  helperText,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    const token = localStorage.getItem('rohit_portfolio_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'File upload failed');
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono uppercase text-[#202522]">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/assets/..."
            className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono text-[#202522] focus:border-[#285943] focus:outline-none"
          />
        </div>

        <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#E8EEE8] border border-[#DDDFD8] hover:border-[#285943] text-xs font-mono text-[#202522] cursor-pointer rounded-xs shrink-0 transition-colors">
          <Upload size={13} className={isUploading ? 'animate-bounce text-[#285943]' : ''} />
          <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {helperText && (
        <p className="text-[11px] font-mono text-[#777D78]">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600 font-mono flex items-center gap-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </p>
      )}

      {value && (
        <div className="flex items-center gap-2 text-xs font-mono text-[#285943] pt-1">
          {value.endsWith('.pdf') ? <FileText size={13} /> : <ImageIcon size={13} />}
          <span className="truncate max-w-xs">{value}</span>
          <span className="text-[10px] text-[#777D78]">• Ready</span>
        </div>
      )}
    </div>
  );
};
