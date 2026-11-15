import React, { useState } from 'react';
import { KeyRound, Shield, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const SecurityTab: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password' });
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setMessage({ type: 'error', text: 'New password must be at least 4 characters long' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation do not match' });
      return;
    }

    const token = localStorage.getItem('rohit_portfolio_admin_token');
    if (!token) {
      setMessage({ type: 'error', text: 'Session expired. Please log in again.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message || 'Password updated successfully! It has been securely saved to .env.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to update password. Please check your current password.',
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Network error or backend API unavailable. Please check if the server is running.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#E8EEE8] text-[#285943] border border-[#DDDFD8] rounded-xs">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-[#202522]">
                Administrator Password & Security
              </h2>
              <p className="text-xs text-[#777D78] mt-0.5">
                Update your login password securely. Changes are automatically written to your server environment (.env).
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 border text-xs flex items-start gap-2.5 ${
              message.type === 'success'
                ? 'bg-[#E8EEE8] border-[#285943] text-[#285943]'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <Check size={16} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed font-mono">{message.text}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#777D78] font-semibold mb-1.5">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password (default: admin123)"
                className="w-full px-3 py-2 pr-10 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-hidden font-mono"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777D78] hover:text-[#202522]"
                tabIndex={-1}
              >
                {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* New Password */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#777D78] font-semibold mb-1.5">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 pr-10 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777D78] hover:text-[#202522]"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#777D78] font-semibold mb-1.5">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-type new password"
                className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-hidden font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDDFD8] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#777D78]">
              Password is saved to local .env and never sent to GitHub.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#285943] text-[#F7F7F2] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#202522] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <KeyRound size={14} />
              <span>{isSubmitting ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Direct File Edit Helper */}
      <div className="p-4 bg-[#E8EEE8]/60 border border-[#DDDFD8] text-xs text-[#777D78] space-y-2 font-mono">
        <div className="font-semibold text-[#285943] uppercase text-[11px]">
          ℹ️ Alternative: Manual .env Edit
        </div>
        <p className="leading-relaxed">
          You can also change the password directly in your project root <code className="text-[#202522] bg-[#F7F7F2] px-1 py-0.5 border border-[#DDDFD8]">.env</code> file under <code className="text-[#202522] bg-[#F7F7F2] px-1 py-0.5 border border-[#DDDFD8]">ADMIN_PASSWORD</code>. Changes to <code className="text-[#202522]">.env</code> are now reloaded immediately on next login attempt without requiring a server restart!
        </p>
      </div>
    </div>
  );
};
