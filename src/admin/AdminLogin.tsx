import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('rohit');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      localStorage.setItem('rohit_portfolio_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to administration server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-[#DDDFD8] bg-[#F7F7F2] p-8 sm:p-10 shadow-lg text-[#202522]">
        {/* Brand Bar */}
        <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xs bg-[#285943] text-[#F7F7F2] font-heading font-bold text-xs flex items-center justify-center">
              RD
            </div>
            <span className="font-heading font-bold text-sm">Portfolio Console</span>
          </div>
          <span className="font-mono text-xs text-[#777D78] flex items-center gap-1">
            <Lock size={12} />
            <span>SECURE GATE</span>
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold font-heading text-[#202522]">
            Administrator Access
          </h1>
          <p className="text-xs font-mono text-[#777D78] leading-relaxed">
            Authentication required to modify portfolio data, projects, and certifications.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={isSubmitting}
              icon={<ArrowRight size={15} />}
              iconPosition="right"
            >
              {isSubmitting ? 'Authenticating...' : 'Enter Dashboard'}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#DDDFD8] flex items-center justify-between text-xs font-mono text-[#777D78]">
          <a href="/" className="hover:text-[#285943] hover:underline">
            ← Return to Public Portfolio
          </a>
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck size={13} className="text-[#285943]" />
            <span>JWT Session</span>
          </span>
        </div>
      </div>
    </div>
  );
};
