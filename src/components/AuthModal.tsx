import React, { useState } from 'react';
import { User } from '../types';
import { loginUser, registerUser } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { user } = await loginUser(email, password);
        onAuthSuccess(user);
        onClose();
      } else {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name');
          setIsLoading(false);
          return;
        }
        const { user } = await registerUser(name, email, password);
        onAuthSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCurator = () => {
    setEmail('emma@tripwise.editorial');
    setPassword('curator123');
    setMode('login');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1A1A1A] w-full max-w-md p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999] hover:text-[#1A1A1A] transition-colors p-1"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Brand Banner */}
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#E5E5E5]">
          <div className="w-7 h-7 bg-[#1A1A1A] rounded-full flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xs italic">T</span>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-medium block">
              TripWise Editorial Access
            </span>
          </div>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="mb-4 p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#1A1A1A] block">Test Curator Account:</span>
            <span className="text-[11px] text-[#666]">emma@tripwise.editorial</span>
          </div>
          <button
            type="button"
            onClick={fillDemoCurator}
            className="px-2.5 py-1 bg-white border border-[#1A1A1A] text-[9px] uppercase tracking-wider font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            Auto-fill
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#FFF5F5] border border-[#E5A5A5] text-xs text-[#B91C1C]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#666] font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3 py-2 border border-[#E5E5E5] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#666] font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@tripwise.com"
              className="w-full px-3 py-2 border border-[#E5E5E5] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#666] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 border border-[#E5E5E5] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-5 pt-4 border-t border-[#E5E5E5] text-center text-xs text-[#666]">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg(null);
                }}
                className="font-bold text-[#1A1A1A] underline hover:text-black cursor-pointer ml-1"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                }}
                className="font-bold text-[#1A1A1A] underline hover:text-black cursor-pointer ml-1"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
